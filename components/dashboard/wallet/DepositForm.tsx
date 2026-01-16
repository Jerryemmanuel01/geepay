"use client";

import React, { useState } from "react";
import { useAddDepositMutation } from "@/lib/redux/features/transactions/transactionsApi";
import { Loader2, Upload, FileText, Image as ImageIcon, X } from "lucide-react";
import { toast } from "react-hot-toast";

export default function DepositForm() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [addDeposit, { isLoading: isApiLoading }] = useAddDepositMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const uploadImage = async (fileToUpload: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error(
        "Cloudinary configuration is missing. Please check .env file."
      );
    }

    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Image upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }

    if (!file) {
      toast.error("Please upload a receipt image");
      return;
    }

    try {
      setIsUploading(true);

      // 1. Upload Image
      let receiptUrl = "";
      try {
        receiptUrl = await uploadImage(file);
      } catch (uploadError: any) {
        console.error("Upload error:", uploadError);
        toast.error(`Upload failed: ${uploadError.message}`);
        setIsUploading(false);
        return;
      }

      // 2. Submit Deposit
      await addDeposit({
        amount: Number(amount),
        receipt: receiptUrl,
        description: description || "Deposit",
      }).unwrap();

      toast.success("Deposit submitted successfully!");

      // Reset form
      setAmount("");
      setDescription("");
      removeFile();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit deposit");
    } finally {
      setIsUploading(false);
    }
  };

  const isLoading = isUploading || isApiLoading;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
        Add Deposit
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Amount ($)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none"
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Description{" "}
            <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="e.g. Bank Transfer"
            />
            <div className="absolute left-3 top-2.5 text-slate-400">
              <FileText size={18} />
            </div>
          </div>
        </div>

        {/* Receipt Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Receipt Screenshot
          </label>

          {!previewUrl ? (
            <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-center cursor-pointer group">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center justify-center space-y-2 text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">
                <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full group-hover:bg-primary/10">
                  <Upload size={24} />
                </div>
                <span className="text-sm font-medium">
                  Click to upload image
                </span>
                <span className="text-xs">PNG, JPG up to 5MB</span>
              </div>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 group">
              <img
                src={previewUrl}
                alt="Receipt preview"
                className="w-full h-48 object-cover"
              />
              <button
                type="button"
                onClick={removeFile}
                className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors backdrop-blur-sm"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 backdrop-blur-md">
                <p className="text-xs text-white truncate max-w-full px-1">
                  {file?.name}
                </p>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              {isUploading ? "Uploading Image..." : "Processing Deposit..."}
            </>
          ) : (
            "Submit Deposit"
          )}
        </button>
      </form>
    </div>
  );
}
