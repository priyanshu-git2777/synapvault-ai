import {
  FileArchive,
  FileCode2,
  FileImage,
  FileSpreadsheet,
  FileText,
  Presentation,
} from "lucide-react";

const supportedFiles = [
  {
    name: "PDF",
    description: "Research papers, reports and documents",
    icon: FileText,
  },
  {
    name: "Word",
    description: "DOC and DOCX document files",
    icon: FileText,
  },
  {
    name: "PowerPoint",
    description: "Presentation and slide files",
    icon: Presentation,
  },
  {
    name: "Spreadsheets",
    description: "CSV, XLS and XLSX data files",
    icon: FileSpreadsheet,
  },
  {
    name: "Images",
    description: "PNG, JPG and other image formats",
    icon: FileImage,
  },
  {
    name: "Code",
    description: "Source code and text-based files",
    icon: FileCode2,
  },
  {
    name: "Archives",
    description: "ZIP and supported archive files",
    icon: FileArchive,
  },
];

export function SupportedFileTypes() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            File support
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Work with your existing documents
          </h2>

          <p className="mt-4 text-muted-foreground">
            Upload common document formats and turn them into searchable,
            grounded knowledge.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {supportedFiles.map((file) => {
            const Icon = file.icon;

            return (
              <div
                key={file.name}
                className="rounded-2xl border bg-background/60 p-6 backdrop-blur"
              >
                <Icon className="h-7 w-7 text-primary" />

                <h3 className="mt-4 font-semibold">{file.name}</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {file.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
