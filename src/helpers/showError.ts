export default function showError(field:string, errorElement:string, e:any, validator:any):void {
  if (document.getElementById(errorElement)) {//@ts-ignore
    e.target.name === field && validator(field, e.target.value) ? (document.getElementById(errorElement).style.opacity = 1) : (document.getElementById(errorElement).style.opacity = 0);
  }
}
