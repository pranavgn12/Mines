function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function waitForClick() {
    return new Promise(resolve => {
        document.body.addEventListener("click", resolve, { once: true });
    });
}

async function animate_title() {
    clicked = true;
    for (i = 0; i < 15; i++) {
        for (j = 0; j < 10; j++) {
            elem.style.backgroundPosition = `left ${-576 * j}px top ${-324 * i}px`;
            await sleep(25);
        }
    }
    clicked = false;
}


async function init() {
    await waitForClick();
    document.getElementById('menu').removeChild(document.getElementById('click'));
    var cssFile = document.createElement("link");
    cssFile.setAttribute("rel", "stylesheet");
    cssFile.setAttribute("type", "text/css");
    cssFile.setAttribute("href", 'styles.css');
    document.getElementsByTagName("head")[0].appendChild(cssFile);
    cssFile.onload = function () { main(); }
}





async function main() {
    let skip_anim=0;
    const vw = window.visualViewport.width;
    const scale = Math.min(vw * 0.92 / 576, 1.2);
    // Math.min(1, Math.max(0, (vw * 0.82) / 576));
    
    const style = document.createElement("style");
    style.id = "dynamic-slide-to-top";

    style.textContent = `
    @keyframes slide-to-top {
      to {
        transform: translateY(-1.6vh);
      }
    }
  `;

    
    document.addEventListener("click", (e) => {
        const count = 4;
        const length = 20;
        for (let i = 0; i < count; i++) {
            const line = document.createElement("div");

            const angle = ((-140 / count) * i)-50;

            line.style.position = "fixed";
            line.style.left = `${e.clientX}px`;
            line.style.top = `${e.clientY}px`;
            line.style.width = `${length}px`;
            line.style.height = "5px";
            line.style.background = "#c34f4f";
            line.style.pointerEvents = "none";
            line.style.transformOrigin = "0 50%";
            line.style.zIndex = "99999";
            line.style.borderRadius="20px";
            document.body.appendChild(line);

            line.animate(
                [
                    {
                        transform: `rotate(${angle}deg) translateX(0px)`,
                        width: `${length}px`,
                        
                    },
                    {
                        transform: `rotate(${angle}deg) translateX(30px)`,
                        width: `${length/4}px`,
                       
                    }
                ],
                {
                    duration: 500,
                    easing: "ease-out"
                }
            );

            setTimeout(() => line.remove(), 500);
        }
        
    });


    document.head.appendChild(style);
    let open_paper_sound = new Audio("open_paper.wav");
    let close_paper_sound = new Audio("close_paper.wav");
    let click_sound = new Audio("../universal/click_003.ogg")
    let rand = 0.1;
    let hdf = 500;
    let ip = document.getElementById('hdfi');
    let settings_btn = document.getElementById("settings");
    let settings_menu = document.getElementById("settings_menu");
    let tutorial = document.getElementById("tutorial");
    let help_btn = document.getElementById("help");
    let sticky_paper = document.getElementById("sticky_paper");
    let ghost = document.getElementById("black_cover");
    let cover_blur = document.getElementById("screen");
    let btn = document.getElementsByClassName("btn");
    let sw = document.getElementsByClassName("sw");
    let larw = document.getElementById("left_arrow");
    let rarw = document.getElementById("right_arrow");
    let slides=document.getElementById("slides")
    let is = document.getElementsByClassName("is");
    let lpf = 0;
    let dtf = 1;
    let sl;
    let play = document.getElementById("play")
    const dots = document.querySelectorAll(".dot");
    let info = document.getElementById("info");
    let info_con = document.getElementById("info_con");
    info_con.style.display="none";
    for(sl=0; sl<6; sl++){
        is[sl].style.backgroundImage = `url(tutorial/${sl}.svg)`;
    }
    sl=0;
    dots[0].style.transform = `scale(1.5)`;
    dots[0].style.backgroundColor = "rgb(43 96 112)";
    let slide_img_width = document.getElementsByClassName('is')[0].clientWidth;
    larw.onclick = () => {
        if (--sl > -1) {
            dots[sl].style.transform = `scale(1.5)`;
            dots[sl].style.backgroundColor="rgb(43 96 112)";
            if ((sl + 1) < 6) {
                dots[sl + 1].style.transform = `scale(1.0)`;
                dots[sl + 1].style.backgroundColor = "rgb(72 122 139)"; }
        }
        else
            sl = 0;
        slides.style.transform = `translateX(-${sl * slide_img_width}px)`;
    }
    rarw.onclick = () => {
        if (++sl < 6) {
            
            dots[sl].style.transform = `scale(1.5)`;
            dots[sl].style.backgroundColor = "rgb(43 96 112)";
            if (sl - 1 > -1){
                dots[sl - 1].style.transform = `scale(1.0)`;
                dots[sl - 1].style.backgroundColor = "rgb(72 122 139)"; 
            }
        }
        else
            sl = 5;
        slides.style.transform = `translateX(-${sl * slide_img_width}px)`;
    }
    

    tutorial.style.display="none";
    settings_menu.style.display = "none";
    ghost.style.display = "none";
    sticky_paper.style.display = "none";
    elem = document.getElementsByClassName("circle");
    for (let i = 0; i < 3; i++) {
        elem[i].style.transform = `rotate(${Math.random() * 360}deg)`;
    }
    let elem2 = document.getElementsByClassName("bg_ele");
    elem2[0].style.opacity = 0;
    for (i = 0; i < elem2.length; i++) {
        elem2[i].style.opacity = 0;
    }

    // let pos1 = [[120, 200], [20, 20], [20, 250], [40, 500], [600, 800], [900, 850],[1400, 650],[1500, 550],[1600, 250], [20,20] ];
    // let pos2 = [[150, 280], [50, 50], [40, 210], [35, 470], [645, 729], [879, 759], [1380, 670], [1520, 534], [1590, 255], [16, 24]];

    // for(i=0; i<9;i++)
    //     elem2[i].style.transform = `translateX(${pos1[i][0]}px) translateY(${pos1[i][1]}px) rotate(${-45 + Math.random() * 90}deg)`;



    // elem2[i].style.transform = `translateX(${Math.random() * 200}px) translateY(${Math.random() * 600}px) rotate(${-45 + Math.random() * 90}deg)`;
    // if(Math.random()>0.5)
    // elem2[0].style.transform = `translateX(${Math.random() * 200}px) translateY(${Math.random() * 600}px) rotate(${-45 + Math.random() * 90}deg)`;
    // else
    // elem2[0].style.transform = `translateX(${1398}px) translateY(${Math.random() * 600}px) rotate(${-45 + Math.random() * 90}deg)`;


    const MIN_X = 0;
    const MAX_X = document.documentElement.clientWidth;
    const LEFT_ZONE = 200;

    const MIN_Y = 0;
    const MAX_Y = window.visualViewport.height;

    let particles = [];

    for (let i = 0; i < elem2.length; i++) {

        let spawnRight = Math.random() > 0.5;

        let x = spawnRight
            ? MAX_X
            : Math.random() * LEFT_ZONE;

        let y = Math.random() * MAX_Y;

        particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            rot: -45 + Math.random() * 90,
            rotSpeed: (Math.random() - 0.5) * 0.2
        });
    }

    function animate() {

        for (let i = 0; i < particles.length; i++) {

            let p = particles[i];

            // small random drift
            p.vx += (Math.random() - 0.5) * 0.01;
            p.vy += (Math.random() - 0.5) * 0.01;

            // speed limit
            p.vx = Math.max(-0.5, Math.min(0.5, p.vx));
            p.vy = Math.max(-0.5, Math.min(0.5, p.vy));

            p.x += p.vx;
            p.y += p.vy;

            // bounce on X boundaries
            if (p.x <= MIN_X || p.x >= MAX_X) {
                p.vx *= -1;
            }

            // bounce on Y boundaries
            if (p.y <= MIN_Y || p.y >= MAX_Y) {
                p.vy *= -1;
            }

            p.rot += p.rotSpeed;

            elem2[i].style.transform =
                `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`;
        }

        requestAnimationFrame(animate);
    }

    animate();
    elem = document.getElementById("buttons");
    elem.style.transform = `scale(${Math.min(vw * 0.85 / 472.55, 1)})`;
    elem = document.getElementById("space_around_buttons");
    elem.style.transform = `scale(1.5)`;
    elem = document.getElementById("options");
    elem.style.opacity = 0;
    elem = document.getElementById("space_around_title");
    elem.style.opacity = 0;
    elem = document.getElementById("space_around_buttons");
    elem.style.opacity = 0;
    elem.style.backgroundPosition = `left 0px top 0px`;
    elem = document.getElementById("cont_title");
    elem.style.transform = `translateY(26vh)`;
    elem = document.getElementById("papermines");
    elem.style.transform = `scale(${scale})`;
    await sleep(100);
    if(skip_anim==0){
    animate_title();
    await sleep(5000);
    }
    elem.style.backgroundPositionX = `-5184px`;
    elem.style.backgroundPositionY = `-4536px`;
    elem = document.getElementById("cont_title");
    elem.style.animation = "1s cubic-bezier(0.25, 1, 0.5, 1) 0s 1 normal forwards running slide-to-top"
    elem.style.height = "clamp(0px, 30vw, 250px)";
    await sleep(300);
    // elem.style.height = `250px`;
    elem = document.getElementById("play");
    elem.style.animation = "1s cubic-bezier(0.25, 1, 0.5, 1) 0s fade-in forwards";
    elem.style.opacity = 1.0;
    elem = document.getElementById("space_around_title");
    elem.style.animation = "1s cubic-bezier(0.25, 1, 0.5, 1) 0s fade-in forwards";
    await sleep(100);
    elem = document.getElementById("highScores");
    elem.style.animation = "1s cubic-bezier(0.25, 1, 0.5, 1) 0s fade-in forwards";
    elem = document.getElementById("space_around_buttons");
    elem.style.animation = "1s cubic-bezier(0.25, 1, 0.5, 1) 0s fade-in forwards";
    await sleep(100);
    elem.style.opacity = 1.0;
    elem = document.getElementById("options");
    elem.style.animation = "1s cubic-bezier(0.25, 1, 0.5, 1) 0s fade-in forwards";
    elem = document.getElementById("highScores");
    elem.style.opacity = 1;
    for (i = 0; i < elem2.length; i++) {
        elem2[i].style.animation = "1s cubic-bezier(0.25, 1, 0.5, 1) 0s fade-in-half forwards";
        await sleep(10);
    }
    elem.style.animation = "";
    elem = document.getElementById("play");
    elem.style.animation = "";
    elem = document.getElementById("highScores");
    elem.style.animation = "";

    elem = document.getElementById("space_around_title");
    elem.style.opacity = 1;


    elem = document.getElementById("space_around_buttons");
    elem.style.opacity = 1.0;
    elem = document.getElementById("papermines");
    elem.onclick = () => { if (clicked == false) animate_title() };
    await sleep(900);
    for (i = 0; i < elem2.length; i++) {
        elem2[i].style.animation = "";
        elem2[i].style.opacity = 0.5;
    }

    btn[4].onclick = () => {
        if (hdf > 100)
            hdf = hdf - 50;
        ip.value = hdf;
    }

    btn[5].onclick = () => {
        if (hdf < 1000)
            hdf = hdf + 50;
        ip.value = hdf;
    }

    ip.addEventListener("blur", () => {
        hdf = parseInt(ip.value);
    });

    ip.addEventListener("focus", () => {
        ip.select();
    });

    ip.addEventListener("input", () => {
        ip.value = ip.value.replace(/[^0-9]/g, "");
    });

    sw[0].onclick = () => {
        lpf++;
        sw[0].innerHTML = "<div class='bc'></div><div class='sw-on'></div>"
        sw[0].style.backgroundColor = "#e1da7f"
        if (lpf > 1) {
            lpf = 0;
            sw[0].innerHTML = "<div class='sw-on'></div><div class='bc'></div>"
            sw[0].style.backgroundColor = "#fff75b"
        }
    }



    sw[1].onclick = () => {
        dtf++;
        sw[1].innerHTML = `<div class="bc"></div><div class='sw-on'></div>`
        sw[1].style.backgroundColor = "#e1da7f"
        if (dtf > 1) {
            dtf = 0;
            sw[1].innerHTML = "<div class='sw-on'></div><div class='bc'></div>"
            sw[1].style.backgroundColor = "#fff75b"
        }
    }


    settings_btn.onclick = () => {
        open_paper_sound.play();
        rand = -(Math.random() * 3);
        sticky_paper.style.setProperty('--rot', `${rand}deg`);
        ip.value = hdf;
        if (lpf == 0) {
            sw[0].innerHTML = "<div class='sw-on'></div><div class='bc'></div>"
            sw[0].style.backgroundColor = "#fff75b"
        }
        else {
            sw[0].innerHTML = `<div class="bc"></div><div class='sw-on'></div>`
            sw[0].style.backgroundColor = "#e1da7f"
        }
        if (dtf == 0) {
            sw[1].innerHTML = "<div class='sw-on'></div><div class='bc'></div>"
            sw[1].style.backgroundColor = "#fff75b"
        }
        else {
            sw[1].innerHTML = "<div class='bc'></div><div class='sw-on'></div>"
            sw[1].style.backgroundColor = "#e1da7f"
        }
        cover_blur.style.filter = "blur(10px)"
        cover_blur.style.animation = '0.5s ease 0s fade-in-blur forwards'
        ghost.style.display = "block";
        settings_menu.style.display = "block";
        sticky_paper.style.backgroundColor = "#fff75b";
        ghost.style.animation = "0.5s ease 0s fade-in-half forwards";
        sticky_paper.style.display = "flex"
        sticky_paper.style.animation = "0.5s ease 0s ease-in-y forwards";

    }

    let closebtn = document.getElementById("set_x");
    closebtn.onclick = async () => {
        close_paper_sound.play();
        cover_blur.style.animation = '0.5s ease 0s fade-out-blur forwards'
        cover_blur.style.filter = "blur(0px)"
        ghost.style.animation = "0.5s ease 0s fade-out-half forwards";
        sticky_paper.style.animation = "0.5s ease 0s ease-out-y forwards";
        await sleep(500)
        settings_menu.style.display = "none";
        tutorial.style.display="none";
        info_con.style.display="none";
        sticky_paper.style.display = "none"
        ghost.style.display = "none";
        ghost.style.opacity = 0;

    }

    function createPRNG(seed) {
        var state = seed >>> 0; // force uint32

        return function () {
            state = (1664525 * state + 1013904223) >>> 0;
            return state / 4294967296; // normalize to [0,1)
        };
    }

    // usage

    const img = new Image()
    await new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = reject
        img.src = img.src = "../pencil_texture.png";
    });




    function render(ctx, vol) {
        var rand = createPRNG(123);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var s = 0.6;
        var pos = { x: 3, y: 3 };
        function draw_line(m, l) {
            q = m;
            for (let i = 0; i < l; i++, pos[q] += s) {
                const angle = rand() * Math.PI * 2; // random rotation

                ctx.save();

                // move to stamp position
                ctx.translate(pos.x, pos.y);

                // rotate
                ctx.rotate(angle);

                // draw centered
                ctx.drawImage(img, -3, -3, 6, 6);

                ctx.restore();
            }
        }
        draw_line('x', 406);
        draw_line('y', 62);
        s = -0.6;
        draw_line('x', 406);
        draw_line('y', 62);
        ctx.beginPath();
        ctx.fillStyle = "#262626";
        if (vol != 0)
            ctx.fillRect(3, 3, 3 + vol * canvas.width - 10, 38);
        pos['x'] = 6 + vol * canvas.width - 10;
        s = 0.6;
        let cnt = parseInt(rand() * 20);
        for (let i = 0; i < cnt; i++);
        draw_line('y', 62);
    }



    var vol = 0.5;
    var vol2 = 0.8

    const canvas = document.getElementById("Sound_fx_level");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    const canvas1 = document.getElementById("Music_vol");
    const ctx1 = canvas1.getContext("2d");
    ctx1.imageSmoothingEnabled = false;






    let dragging = false;
    let rect;

    canvas.addEventListener("mousedown", (e) => {
        rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left - 6;
        vol = (x / (rect.width - 14));

        // clamp
        if (vol < 0) vol = 0;
        else if (vol > 1) vol = 1;
        render(ctx, vol);
        dragging = true;
    });

    canvas.addEventListener("mousemove", (e) => {
        if (!dragging) return;

        const x = e.clientX - rect.left - 6;
        vol = (x / (rect.width - 14));

        // clamp
        if (vol < 0) vol = 0;
        else if (vol > 1) vol = 1;
        render(ctx, vol);
        console.log(vol);
    });

    window.addEventListener("mouseup", () => { dragging = false; });

    canvas1.addEventListener("mousedown", (e) => {
        rect = canvas1.getBoundingClientRect();
        const x = e.clientX - rect.left - 6;
        vol2 = (x / (rect.width - 14));

        // clamp
        if (vol2 < 0) vol2 = 0;
        else if (vol2 > 1) vol2 = 1;
        render(ctx1, vol2);
        dragging = true;
    });

    canvas1.addEventListener("mousemove", (e) => {
        if (!dragging) return;

        const x = e.clientX - rect.left - 6;
        vol2 = (x / (rect.width - 14));

        // clamp
        if (vol2 < 0) vol2 = 0;
        else if (vol2 > 1) vol2 = 1;
        render(ctx1, vol2);
    });

    // ---- TOUCH SUPPORT FOR canvas ----
    canvas.addEventListener("touchstart", (e) => {
        const touch = e.touches[0];
        rect = canvas.getBoundingClientRect();

        const x = touch.clientX - rect.left - 6;
        vol = (x / (rect.width - 14));

        if (vol < 0) vol = 0;
        else if (vol > 1) vol = 1;

        render(ctx, vol);
        dragging = true;
    }, { passive: true });

    canvas.addEventListener("touchmove", (e) => {
        if (!dragging) return;

        const touch = e.touches[0];
        const x = touch.clientX - rect.left - 6;
        vol = (x / (rect.width - 14));

        if (vol < 0) vol = 0;
        else if (vol > 1) vol = 1;

        render(ctx, vol);
    }, { passive: true });

    window.addEventListener("touchend", () => {
        dragging = false;
    });

    canvas1.addEventListener("touchstart", (e) => {
        const touch = e.touches[0];
        rect = canvas1.getBoundingClientRect();

        const x = touch.clientX - rect.left - 6;
        vol2 = (x / (rect.width - 14));

        if (vol2 < 0) vol2 = 0;
        else if (vol2 > 1) vol2 = 1;

        render(ctx1, vol2);
        dragging = true;
    }, { passive: true });

    canvas1.addEventListener("touchmove", (e) => {
        if (!dragging) return;

        const touch = e.touches[0];
        const x = touch.clientX - rect.left - 6;
        vol2 = (x / (rect.width - 14));

        if (vol2 < 0) vol2 = 0;
        else if (vol2 > 1) vol2 = 1;

        render(ctx1, vol2);
    }, { passive: true });

    render(ctx, vol);
    render(ctx1, vol2);

    btn[0].onclick = () => {
        if (vol > 0) {
            vol -= 0.2
            render(ctx, vol);
        }
        if (vol < 0) {
            vol = 0;
            render(ctx, vol);
        }
    }
    btn[1].onclick = () => {
        if (vol < 1) {
            vol += 0.2
            render(ctx, vol);
        }
        if (vol > 1) {
            vol = 1;
            render(ctx, vol);
        }
    }

    btn[2].onclick = () => {
        if (vol2 > 0) {
            vol2 -= 0.2
            render(ctx1, vol2);
        }
        if (vol2 < 0) {
            vol2 = 0;
            render(ctx1, vol2);
        }
    }
    btn[3].onclick = () => {
        if (vol2 < 1) {
            vol2 += 0.2
            render(ctx1, vol2);
        }
        if (vol2 > 1) {
            vol2 = 1;
            render(ctx1, vol2);
        }
    }

    help_btn.onclick = () => {
        open_paper_sound.play();
        rand = -(Math.random() * 3);
        sticky_paper.style.setProperty('--rot', `${rand}deg`);
        ip.value = hdf;
        sl=0;
        slides.style.transform = `translateX(-${sl * slide_img_width}px)`;


        dots.forEach((e) => {
            e.style.transform = "scale(1.0)";
            e.style.backgroundColor = "rgb(72, 122, 139)";
        });



        
        dots[0].style.transform = `scale(1.5)`;
        for (q=1; q<dots.length;q++)
        {
            dots[q].style.transform = `scale(1.0)`;
        }
        dots[0].style.backgroundColor = "rgb(43 96 112)";
        cover_blur.style.filter = "blur(10px)"
        tutorial.style.display="block";
        sticky_paper.style.backgroundColor = "rgb(91, 217, 255)";
        cover_blur.style.animation = '0.5s ease 0s fade-in-blur forwards'
        ghost.style.display = "block";
        ghost.style.animation = "0.5s ease 0s fade-in-half forwards";
        sticky_paper.style.display = "flex"
        tutorial.style.display="flex"
        sticky_paper.style.animation = "0.5s ease 0s ease-in-y forwards";
    }
    info.onclick = () =>{
        open_paper_sound.play();
        rand = -(Math.random() * 3);
        sticky_paper.style.setProperty('--rot', `${rand}deg`);
        cover_blur.style.filter = "blur(10px)"
        info_con.style.display = "block";
        sticky_paper.style.backgroundColor = "rgb(255 189 148)";
        cover_blur.style.animation = '0.5s ease 0s fade-in-blur forwards'
        ghost.style.display = "block";
        ghost.style.animation = "0.5s ease 0s fade-in-half forwards";
        sticky_paper.style.display = "flex"
        sticky_paper.style.animation = "0.5s ease 0s ease-in-y forwards";
    }
    play.onclick = () =>{
        click_sound.play();
        cover_blur.style.animation = "fadeOutEffect 0.5s ease-out forwards";

        setTimeout(() => {
            window.location.href = "../Game/page.html";
        }, 1000);

    };
}


let i = 0, j = 0,q;
let clicked = false;
let elem;
let pos;
init();






// elem.style.animation = ` 
//     animX 0.25s steps(10) 15 forwards,
//     animY 3.75s steps(15) forwards
// `;

//     await sleep(3850);
//     elem.style.backgroundPositionX=`-270vw`;
//     elem.style.backgroundPositionY = `-236.25vw`;
//await sleep(2000)
//elem.style.animation ="0s cubic-bezier(0.25, 1, 0.5, 1) 0s 1 normal forwards running ease-to-top"