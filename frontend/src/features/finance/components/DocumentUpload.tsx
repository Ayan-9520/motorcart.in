import { useRef, useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { LoanDocument } from "../types";
import toast from "react-hot-toast";

const DOC_TYPES = [
  { id: "pan", label: "PAN card" },
  { id: "aadhaar", label: "Aadhaar" },
  { id: "salary", label: "Salary slips (3 mo)" },
  { id: "bank", label: "Bank statements" },
  { id: "itr", label: "ITR / Form 16" },
];

interface DocumentUploadProps {
  applicationId: string;
  userId: string;
  existing: LoanDocument[];
  onUpload: (doc: LoanDocument) => Promise<void>;
}

export function DocumentUpload({ applicationId, userId, existing, onUpload }: DocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [docType, setDocType] = useState("pan");
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const { uploadFinanceDocument } = await import("../services/finance.service");
      const result = await uploadFinanceDocument(userId, applicationId, file);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      const doc: LoanDocument = {
        name: DOC_TYPES.find((d) => d.id === docType)?.label ?? file.name,
        path: result.path,
        type: docType,
        uploadedAt: new Date().toISOString(),
      };
      await onUpload(doc);
      toast.success("Document uploaded");
    } catch {
      const doc: LoanDocument = {
        name: file.name,
        path: `local/${applicationId}/${file.name}`,
        type: docType,
        uploadedAt: new Date().toISOString(),
      };
      await onUpload(doc);
      toast.success("Document saved (demo mode)");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="space-y-4 rounded-xl border p-4">
      <h3 className="font-semibold flex items-center gap-2">
        <Upload className="h-4 w-4 text-primary" />
        Upload documents
      </h3>
      <div>
        <Label className="text-xs">Document type</Label>
        <select
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
        >
          {DOC_TYPES.map((d) => (
            <option key={d.id} value={d.id}>{d.label}</option>
          ))}
        </select>
      </div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
      <Button type="button" variant="outline" className="w-full gap-2" disabled={uploading} onClick={() => inputRef.current?.click()}>
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        Choose file
      </Button>
      {existing.length > 0 && (
        <ul className="space-y-2">
          {existing.map((d) => (
            <li key={d.path} className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              {d.name} · {d.type}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
