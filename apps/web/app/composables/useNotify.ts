export const useNotify = () => {
  const toast = useToast();
  return {
    success(message: string) {
      toast.add({ title: "Thành công", description: message, color: "green" });
    },
    error(message: string) {
      toast.add({ title: "Lỗi", description: message, color: "red" });
    },
    info(message: string) {
      toast.add({ title: "Thông báo", description: message, color: "blue" });
    },
  };
};
