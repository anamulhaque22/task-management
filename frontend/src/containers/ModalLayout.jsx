function ModalLayout({
  setIsOpen,
  isOpen,
  size,
  extraObject,
  title,
  performTask,
}) {
  const { message, _id } = extraObject;
  const close = () => {
    setIsOpen(!isOpen);
  };
  const proceedWithYes = async () => {
    performTask(_id);
    close();
  };

  return (
    <>
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className={`modal-box  ${size === "lg" ? "max-w-5xl" : ""}`}>
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => close()}
          >
            ✕
          </button>
          <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>

          {/* modal body  */}
          <p className=" text-xl mt-8 text-center">{message}</p>

          <div className="modal-action mt-12">
            <button className="btn btn-outline   " onClick={() => close()}>
              Cancel
            </button>

            <button
              className="btn btn-primary w-36"
              onClick={() => proceedWithYes()}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalLayout;
