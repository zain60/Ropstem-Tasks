import "../components/Toasts.css"
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



  const success_Toast = () => {
    toast.info(" Trx Fee Updated Successfully", {
        className: "custom-toast",
        draggable: false,
        position: toast.POSITION.TOP_CENTER,
    });
 }
 const Amount_Toast_Id = (result) => {
  toast.success((result),{
      className: "custom-toast",
      draggable: false,
      position: toast.POSITION.TOP_CENTER,
  });
  
  
}

const Amount_Toast = () => {
  toast.error("Amount cannt be 'Zero'", {
      className: "custom-toast",
      draggable: false,
      position: toast.POSITION.TOP_CENTER,
  });
}

 export default{ success_Toast, Amount_Toast_Id,Amount_Toast}
   