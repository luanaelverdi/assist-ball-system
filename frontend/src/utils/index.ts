import Swal, { SweetAlertIcon } from 'sweetalert2'

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

const firePopup = (text: string, type: 'success' | 'error' | 'info', onClose?: () => void) => {
  const config: { icon: SweetAlertIcon; title: string } = {
    icon: 'success',
    title: 'Éxito'
  }

  if (type === 'error') {
    config.icon = 'error'
    config.title = 'Error'
  }

  if (type === 'info') {
    config.icon = 'info'
    config.title = 'Atención'
  }

  Swal.fire({
    icon: config.icon,
    title: config.title,
    text,
    confirmButtonText: 'OK',
    customClass: {
      confirmButton: 'swal-confirm',
    },
    didClose: onClose
  })
}


export {
  firePopup,
  debounce
}