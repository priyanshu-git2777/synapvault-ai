import type {
  DocumentStatus,
} from "./document.types";

export function formatFileSize(
  bytes: number,
): string {
  if (bytes === 0) {
    return "0 B";
  }

  const units = [
    "B",
    "KB",
    "MB",
    "GB",
  ];

  const index = Math.min(
    Math.floor(
      Math.log(bytes) / Math.log(1024),
    ),
    units.length - 1,
  );

  const value =
    bytes / Math.pow(1024, index);

  return `${value.toFixed(
    index === 0 ? 0 : 1,
  )} ${units[index]}`;
}

export function formatDocumentDate(
  isoDate: string,
): string {
  return new Intl.DateTimeFormat(
    undefined,
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  ).format(new Date(isoDate));
}

export function getStatusLabel(
  status: DocumentStatus,
): string {
  switch (status) {
    case "UPLOADED":
      return "Uploaded";

    case "PROCESSING":
      return "Processing";

    case "READY":
      return "Ready";

    case "FAILED":
      return "Failed";

    default:
      return status;
  }
}