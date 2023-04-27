import { getAllCategories , deleteCategoryByID , postCategory } from "./httprequests.js";
let list = document.querySelector(".categories");
postCategory({ name: '123', description: '1234' });
getAllCategories().then(data => {
    data.forEach(category => {
        list.innerHTML += `<li class="list-group-item d-flex justify-content-between">
        <span>${category.name}</span>
        <button class = "btn btn-danger" data-id = "${category.id}"><i class="fa-solid fa-trash"></i></button>
        </li>`
    });
    Array.from(list.children).forEach(item => {
        let deleteBtn = item.children[1];
        deleteBtn.addEventListener("click", (e) => {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    let id = e.target.getAttribute("data-id");
                    deleteCategoryByID(id)
                    //delete li
                    e.target.parentElement.remove();
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Your imaginary file is safe :)',
                        'error'
                    )
                }
            })
        })
    })
})