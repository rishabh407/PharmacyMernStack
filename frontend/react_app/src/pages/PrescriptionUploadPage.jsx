import React, { useState } from "react";
import { UploadCloud, FileText } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const PrescriptionUploadPage = () => {
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!file) {
    toast.error("Please upload a prescription file");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("prescription", file);
    formData.append("notes", notes);

    await api.post("/prescriptions", formData);

    toast.success("Prescription uploaded. Waiting for pharmacist approval.");

    // Optional: reset form
    setFile(null);
    setNotes("");

  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
      "Failed to upload prescription"
    );
  }
};



  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-sky-100 max-w-xl w-full p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-sky-100 flex items-center justify-center">
            <FileText className="text-sky-700" size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-sky-900">
              Upload Prescription
            </h1>
            <p className="text-sky-700 text-sm">
              Our pharmacists will verify your prescription before processing
              your order.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="border-2 border-dashed border-sky-200 rounded-2xl bg-sky-50/60 p-6 text-center cursor-pointer hover:border-sky-400 transition">
            <input
              id="prescription"
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="prescription" className="block">
              <UploadCloud className="mx-auto text-sky-600 mb-3" size={32} />
              <p className="text-sky-900 font-semibold">
                {file ? file.name : "Click to upload or drag & drop"}
              </p>
              <p className="text-xs text-sky-600 mt-1">
                Accepted formats: JPG, PNG, PDF (Max 5MB)
              </p>
            </label>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-sky-900">
              Notes for Pharmacist (optional)
            </label>
            <textarea
              className="w-full min-h-[90px] px-4 py-2 border rounded-xl focus:ring-2 focus:ring-sky-400 outline-none text-sm"
              placeholder="Mention preferred brand, dosage instructions or delivery notes."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-sm font-semibold shadow-sm transition disabled:bg-sky-300"
            disabled={!file}
          >
            Submit Prescription
          </button>

          <p className="text-[11px] text-sky-600 mt-2">
            By uploading, you confirm that this prescription is issued by a
            registered medical practitioner and is valid.
          </p>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionUploadPage;
