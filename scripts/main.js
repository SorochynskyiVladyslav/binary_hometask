$(document).ready(() => {
    add_grid();
    $('.time-grid').hide();

    $('.day-header').on('click', ()=>{
        $(event.currentTarget).next().children().last().slideToggle();
    })
    
    $('.tip-icon').on('click', ()=>{
        $(event.currentTarget).parent().next().slideToggle();
    })

    $('.time').on('mouseover', ()=>{
        if (event.ctrlKey) $(event.currentTarget).toggleClass("active");
    })

    $('.time').on('click', ()=>{
        $(event.currentTarget).toggleClass("active");
    })
})

function toggle_menu(hamburger){
    hamburger.classList.toggle("change");
    document.getElementById("side-menu").classList.toggle("active");
}

function add_grid(){
    let time_grid = `<div class="time-grid">
        <div class="time am 1">1 am</div>
        <div class="time am 2">2 am</div>
        <div class="time am 3">3 am</div>
        <div class="time am 4">4 am</div>
        <div class="time am 5">5 am</div>
        <div class="time am 6">6 am</div>
        <div class="time am 7">7 am</div>
        <div class="time am 8">8 am</div>
        <div class="time am 9">9 am</div>
        <div class="time am 10">10 am</div>
        <div class="time am 11">11 am</div>
        <div class="time am 12">12 am</div>
        <div class="time pm 1">1 pm</div>
        <div class="time pm 2">2 pm</div>
        <div class="time pm 3">3 pm</div>
        <div class="time pm 4">4 pm</div>
        <div class="time pm 5">5 pm</div>
        <div class="time pm 6">6 pm</div>
        <div class="time pm 7">7 pm</div>
        <div class="time pm 8">8 pm</div>
        <div class="time pm 9">9 pm</div>
        <div class="time pm 10">10 pm</div>
        <div class="time pm 11">11 pm</div>
        <div class="time pm 12">12 pm</div>
        </div>`;
    $('.day').append(time_grid);
}