const handelLoader = async () => {
   
    const reserve = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await reserve.json();
    const sinfleData = data.data.news_category.slice(0, 3);
    const tabContainer = document.getElementById('tab-container')
    sinfleData.forEach(element => {
        // console.log(element)
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <a onclick="loadSingleData('${element.category_id}')" class="tab">${element.category_name}</a> 
        `
        tabContainer.appendChild(newDiv);
    });
}
// load All news in a Category
const loadSingleData = async (categoryId) => {
    // console.log(categoryId)
    const reserve = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    const data = await reserve.json();
    const mainData = data.data;
    console.log(mainData)
    const cardPlace = document.getElementById('card-container');
    cardPlace.innerHTML = ''
    mainData.forEach(data => {
        // console.log(data._id)
        const div = document.createElement('div');
        div.innerHTML = `
            
            <div class="card  bg-base-100 shadow-xl">
            <figure>
              <img
                src="${data.image_url}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">
                Biden Pledges Nearly $3 Billion To Ukraine
                <div class="badge badge-secondary p-5">${data?.rating?.badge}</div>
              </h2>
              <p>
               ${data?.details.slice(0,50)}
              </p>
              <div class="card-footer flex justify-between mt-8">
                <div class="flex">
                  <div>
                    <div class="avatar online">
                      <div class="w-14 rounded-full">
                        <img
                          src="${data?.author?.img}"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h6>${data?.author?.name}</h6>
                    <small>${data?.author?.published_date}</small> 
                    <p> view: ${data?.total_view?data.total_view :'No view'}</p>
                  </div>
                </div>
                <div class="card-detaild-btn">
                  <button onclick="handleModal('${data._id}')"
                    class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>

            
            `
        cardPlace.appendChild(div)

    })

}

// modal handle
const handleModal =async(newsId)=>{
const reserve =await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
const data =await reserve.json();
console.log(data.data)
const modalContainer =document.getElementById('modal-container');
const Div =document.createElement('div')
Div.innerHTML = `
<!-- Open the modal using ID.showModal() method -->

<dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box">
  <img
  src="${data?.data[0].image_url}"
/>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>

`

modalContainer.appendChild(Div);
const modal =document.getElementById('my_modal_1');
modal.showModal();

}


handleModal()

handelLoader()
loadSingleData('01')