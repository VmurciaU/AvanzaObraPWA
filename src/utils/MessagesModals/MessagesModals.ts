import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const MessageError = (
  title: string,
  message: string,
) => MySwal.fire({
  title,
  html: message,
  icon: "error",
  denyButtonColor: "#F40103",
  confirmButtonColor: "#205C46",
  backdrop: false,
  customClass: {
    // Aplica el estilo de z-index directamente al contenedor de SweetAlert
    popup: "z-index: 9999 !important;" // Ajusta el valor según tus necesidades
  }
});

const MessageWaiting = (
  title: string,
  message: string,
  allowOutsideClick: boolean,
): void => {
  MySwal.fire({
    title,
    html: message,
    allowOutsideClick,
    denyButtonColor: "#F40103",
    confirmButtonColor: "#205C46",
    backdrop: true
  });
  MySwal.showLoading();
};

const MessageSuccessInfo = (
  title: string,
  message: string,
  allowOutsideClick: boolean,
) => MySwal.fire({
  title,
  html: message,
  icon: "info",
  allowOutsideClick,
  denyButtonColor: "#F40103",
  confirmButtonColor: "#205C46",
  backdrop: true
});

const MessageSuccess = (
  title: string,
  message: string,
  allowOutsideClick: boolean,
) => MySwal.fire({
  title,
  html: message,
  icon: "success",
  allowOutsideClick,
  denyButtonColor: "#F40103",
  confirmButtonColor: "#205C46",
  backdrop: true
});

const MessageConfirmation = (
  title: string,
  message: string,
  allowOutsideClick: boolean,
) => MySwal.fire({
  title,
  html: message,
  icon: "question",
  showCancelButton: true,
  confirmButtonText: "Si",
  cancelButtonText: "Cancelar",
  allowOutsideClick,
  denyButtonColor: "#F40103",
  confirmButtonColor: "#205C46",
  backdrop: true
});

const MessageConfirmation2 = (
  title: string,
  message: string,
  allowOutsideClick: boolean,
  boton1: string,
  boton2: string,
) => MySwal.fire({
  title,
  html: message,
  icon: "question",
  showCancelButton: true,
  confirmButtonText: boton1,
  cancelButtonText: boton2,
  allowOutsideClick,
  denyButtonColor: "#F40103",
  confirmButtonColor: "#205C46",
  backdrop: true
});

const MessageInfo = (
  title: string,
  message: string,
  allowOutsideClick: boolean,
) => MySwal.fire({
  title,
  html: message,
  icon: "info",
  allowOutsideClick,
  denyButtonColor: "#F40103",
  confirmButtonColor: "#205C46",
  backdrop: true
});

const CloseSwal = (): void => {
  MySwal.close();
};

const MessageQuestionSync = (
  allowOutsideClick: boolean,
  message: string,
) => MySwal.fire({
  title: "¿Sincronizar datos?",
  html: message,
  icon: "question",
  confirmButtonText: "Si, sincronizar",
  showCancelButton: true,
  cancelButtonText: "Cancelar",
  allowOutsideClick,
  denyButtonColor: "#F40103",
  confirmButtonColor: "#205C46",
  backdrop: true
});

export {
  MessageError,
  MessageWaiting,
  MessageSuccessInfo,
  MessageSuccess,
  CloseSwal,
  MessageQuestionSync,
  MessageInfo,
  MessageConfirmation,
  MessageConfirmation2
};
