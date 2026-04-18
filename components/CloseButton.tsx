type CloseButtonProps = {
  onClose: () => void;
};

export default function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="rounded-md border border-[#2a2a2a] px-3 py-2 text-base text-[#999] transition-colors hover:border-[#3a3a3a] hover:text-[#F0EDE6]"
    >
      Close
    </button>
  );
}
