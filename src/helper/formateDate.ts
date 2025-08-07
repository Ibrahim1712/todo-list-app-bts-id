export const formatDateTransactionHistory = (dateString: string) => {
  try {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleDateString("id-ID", { month: "long" });
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month} ${year} ${hours}.${minutes}`;
  } catch {
    return dateString;
  }
};
