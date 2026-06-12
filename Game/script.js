function getRandom(min, max) {
    return (min + Math.floor(Math.random() * (max - min + 1)));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


class cell {
    constructor(value) {
        this.value = value;
        this.reveal = false;
    }
}
let rem_cells = 0;
class grid {
    constructor(width, height, minesper) {
        this.cells = new Array(height).fill(0).map(() => new Array(width).fill(0).map(() => new cell(0)));
        this.rows = this.cells.length;
        this.cols = this.cells[0].length;
        this.flag = new Array(height).fill(false).map(() => new Array(width).fill(false));
        this.per = minesper;
    }
    placeMines(percent, mc, mr) {
        let random_row, random_column, i, j, k, l, g;
        let total_cells = this.rows * this.cols;
        for (g = 0; g < Math.floor(percent / 100 * total_cells); g++) {
            random_row = getRandom(0, this.rows - 1);
            random_column = getRandom(0, this.cols - 1);
            if (
                this.cells[random_row][random_column].value != -1 &&
                !(
                    Math.abs(random_row - mr) <= 1 &&
                    Math.abs(random_column - mc) <= 1
                )
            ) {
                this.cells[random_row][random_column].value = -1;
                rem_cells++;
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (dx == 0 && dy == 0) continue;

                        const nx = random_row + dx;
                        const ny = random_column + dy;

                        if (nx >= 0 && nx < this.rows && ny >= 0 && ny < this.cols) {
                            if (this.cells[nx][ny].value != -1) {
                                this.cells[nx][ny].value += 1;
                            }
                        }
                    }
                }
            }

        }
    }
}



async function bfs(x, y) {
    if (y < a.cells.length && x < a.cells[0].length && x >= 0 && y >= 0 && a.cells[y][x].value != -1 && a.cells[y][x].reveal == false) {
        if (a.cells[y][x].value == 0) {
            console.log("in");
            let que = new Array(2500);
            for (let i = 0; i < que.length; i++) {
                que[i] = [new Number, new Number];
            }
            let fp = 0;
            let bp = 0;
            let rem_cells = 0;
            que[bp] = [x, y];
            while (fp <= bp) {
                [x, y] = que[fp++];
                a.cells[y][x].reveal = true;
                xc = [0, 1, 1, 1, 0, -1, -1, -1];
                yc = [-1, -1, 0, 1, 1, 1, 0, -1];
                for (i = 0; i < 8; i++) {
                    // console.clear();
                    px = x + xc[i];
                    py = y + yc[i];
                    if (px >= 0 && py >= 0 && py < a.cells.length && px < a.cells[0].length) {
                        if (a.cells[py][px].value == 0 && a.cells[py][px].reveal == false) {
                            que[++bp] = [px, py];
                        }
                        else if (a.cells[py][px].value > 0) {
                            a.cells[py][px].reveal = true
                        }
                    }
                    console.log(que.length);

                }
            }
        }
        else
            a.cells[y][x].reveal = true
    }
    else if (a.cells[y][x].value == -1) {
        game_over = true;
        console.log("in");
        ctx.drawImage(mine_img, 20 + x * w + x * gap + 0.6 * x_push, y * w + y * gap + y_pad + 0.2 * y_push, 0.7 * w, 0.7 * w);
        for (let i = 0; i < c; i++)
            for (let j = 0; j < r; j++)
                if (a.cells[j][i].value == -1) {
                    ctx.drawImage(mine_img, 20 + i * w + i * gap + 0.6 * x_push, j * w + j * gap + y_pad + 0.2 * y_push, 0.7 * w, 0.7 * w);
                }
        ctx.fillStyle = "#000000a8";
        drawSquircle(ctx, 20 - 5, y_pad - 5, c * w + 10, c * w + 10, {
            radius: 45,
            smoothing: 0.8,
            corners: { tl: true, tr: true, br: true, bl: true }
        });
        ctx.fill();
        ctx.font = "100px serif";
        ctx.fillStyle = "#ff8484e2";
        ctx.fillText("Game Over!", canvas.width / 2 - 240, canvas.height / 2 + 25);
    }
}









const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const restart = document.getElementById("btn2");


restart.addEventListener("click", () => {
    location.reload();
});

const flag_img = new Image();
let game_over = false;
flag_img.src = "./flag.svg";
const mine_img = new Image();
mine_img.src = "./mine.svg";
async function load_sprites() {
    await new Promise((resolve, reject) => {
        flag_img.onload = resolve;
        flag_img.onerror = reject;
    });
    await new Promise((resolve, reject) => {
        mine_img.onload = resolve;
        mine_img.onerror = reject;
    });
}
load_sprites();

let mx, my;
const c = 10;
const r = 10;
const gap = 0;
let al = 0;
const w = (canvas.width - 40 - (gap * (c - 8))) / c;
const y_pad = (canvas.height - ((r * w) + (1 * gap * (r - 1)))) / 2;
const a = new grid(r, c, Math.floor(Math.random() * (40 - 25 + 1)) + 25);
const clr1 = "#0092CE"
const clr2 = "#0075A6"
const clr3 = "#FFFFFF"
const clr4 = "#F4F4F4"
let opclr = "#1c1c1c"

const txt_clr = [
    "#312E81", // 1 - indigo
    "#ff5100", // 2 - dark blue
    "#0F766E", // 6 - teal
    "#1aa24e", // 3 - dark green
    "#991B1B", // 4 - dark red
    "#7C2D12", // 5 - brown
    "#111827", // 7 - near black
    "#581C87"  // 8 - dark purple
];


const font_size = w / 1.2;
const x_push = w / 3.5;
const y_push = w / 1.25;
async function loadFont() {
    const font = new FontFace(
        "MyFont",
        'url("./ComicNeue-Regular.ttf")'
    );
    await font.load();
    document.fonts.add(font);
    ctx.font = `${font_size}px MyFont`;
}

loadFont();
console.log(a.cells[0][0].reveal);
canvas.addEventListener("mousemove", (e) => {
    if (game_over == false) {
        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const mx = (e.clientX - rect.left) * scaleX;
        const my = (e.clientY - rect.top) * scaleY;
        console.log(mx, my);
        if (mx > 20 && mx < 774 && my > y_pad && my < (900 - y_pad)) {
            let mc = parseInt((mx - 20) / (w + gap));
            let mr = parseInt((my - y_pad) / (w + gap));
            console.log(mc, mr)
            render_grid();
            if (mr < r && mc < c && a.cells[mr][mc].reveal == false) {
                ctx.fillStyle = "rgb(0, 179, 255)";
                if (mr == 0 && mc == 0) {
                    drawSquircle(ctx, 20, y_pad, w, w, {
                        radius: 50,
                        smoothing: 0.8,
                        corners: { tl: true, tr: false, br: false, bl: false }
                    });
                    ctx.fill();
                }
                else if (mc == (c - 1) && mr == 0) {

                    drawSquircle(ctx, (c - 1) * w + (c - 1) * gap + 20, y_pad, w, w, {
                        radius: 50,
                        smoothing: 0.8,
                        corners: { tl: false, tr: true, br: false, bl: false }
                    });
                    ctx.fill();
                }
                else if (mc == 0 && mr == (r - 1)) {

                    drawSquircle(ctx, 20, (r - 1) * w + (r - 1) * gap + y_pad, w, w, {
                        radius: 50,
                        smoothing: 0.8,
                        corners: { tl: false, tr: false, br: false, bl: true }
                    });
                    ctx.fill();
                }
                else if (mc == (c - 1) && mr == (r - 1)) {
                    drawSquircle(ctx, (c - 1) * (w + gap) + 20, (r - 1) * w + (r - 1) * gap + y_pad, w, w, {
                        radius: 50,
                        smoothing: 0.8,
                        corners: { tl: false, tr: false, br: true, bl: false }
                    });
                    ctx.fill();
                }

                else
                    ctx.fillRect(mc * w + mc * gap + 20, mr * w + mr * gap + y_pad, w, w);
            }
        }
    }
});

canvas.addEventListener("contextmenu", (e) => {
    if (game_over == false) {
        const rect = canvas.getBoundingClientRect();
        e.preventDefault();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const mx = (e.clientX - rect.left) * scaleX;
        const my = (e.clientY - rect.top) * scaleY;

        if (mx > 20 && mx < 774 && my > y_pad && my < (900 - y_pad)) {
            let mc = parseInt((mx - 20) / (w + gap));
            let mr = parseInt((my - y_pad) / (w + gap));
            if (a.flag[mr][mc] == false) {
                a.flag[mr][mc] = true;
                render_grid();
            }
            else {
                a.flag[mr][mc] = false;
                render_grid();
            }
        }
    }
});









function drawSquircle(ctx, x, y, w, h, options = {}) {
    const {
        radius = 20,
        smoothing = 0.5, // 0 = more circular, 1 = more squircle-like
        corners = { tl: true, tr: true, br: true, bl: true },
    } = options;

    const r = Math.max(0, Math.min(radius, w / 2, h / 2));
    const s = Math.max(0, Math.min(1, smoothing));

    // Control how “pulled in” the curve is.
    // Lower = rounder, higher = squarer.
    const k = 0.55228475 * (1 - s) + 0.12 * s;

    ctx.beginPath();

    // Start at top-left area
    ctx.moveTo(x + (corners.tl ? r : 0), y);

    // Top edge
    ctx.lineTo(x + w - (corners.tr ? r : 0), y);
    if (corners.tr) {
        ctx.bezierCurveTo(
            x + w - r * k, y,
            x + w, y + r * k,
            x + w, y + r
        );
    } else {
        ctx.lineTo(x + w, y);
    }

    // Right edge
    ctx.lineTo(x + w, y + h - (corners.br ? r : 0));
    if (corners.br) {
        ctx.bezierCurveTo(
            x + w, y + h - r * k,
            x + w - r * k, y + h,
            x + w - r, y + h
        );
    } else {
        ctx.lineTo(x + w, y + h);
    }

    // Bottom edge
    ctx.lineTo(x + (corners.bl ? r : 0), y + h);
    if (corners.bl) {
        ctx.bezierCurveTo(
            x + r * k, y + h,
            x, y + h - r * k,
            x, y + h - r
        );
    } else {
        ctx.lineTo(x, y + h);
    }

    // Left edge
    ctx.lineTo(x, y + (corners.tl ? r : 0));
    if (corners.tl) {
        ctx.bezierCurveTo(
            x, y + r * k,
            x + r * k, y,
            x + r, y
        );
    } else {
        ctx.lineTo(x, y);
    }

    ctx.closePath();
}

function al_color() {
    if (al == 1)
        al = 0;
    else
        al = 1;
}

function render_grid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(y_pad);

    ctx.fillStyle = "#005679";
    drawSquircle(ctx, 20 - 5, y_pad - 5, c * w + 10, c * w + 10, {
        radius: 45,
        smoothing: 0.8,
        corners: { tl: true, tr: true, br: true, bl: true }
    });
    ctx.fill();
    if (a.cells[0][0].reveal == false) {
        if (al == 0)
            ctx.fillStyle = clr1;
        else
            ctx.fillStyle = clr2;
        al_color();

    }
    else {
        if (al == 0)
            ctx.fillStyle = clr3;
        else
            ctx.fillStyle = clr4;
        al_color();

    }


    drawSquircle(ctx, 20, y_pad, w, w, {
        radius: 50,
        smoothing: 0.8,
        corners: { tl: true, tr: false, br: false, bl: false }
    });
    ctx.fill();



    if (a.cells[0][0].reveal == true && a.cells[0][0].value != 0) {
        ctx.fillStyle = txt_clr[a.cells[0][0].value - 1];
        ctx.fillText(a.cells[0][0].value, 20 + x_push, y_pad + y_push);
    }
    if (a.flag[0][0] == true && a.cells[0][0].reveal == false)
        ctx.drawImage(flag_img, 20 + 0.6 * x_push, y_pad + 0.2 * y_push, 0.7 * w, 0.7 * w);

    if (a.cells[0][0].reveal == true) {
        if (a.cells[1][0].reveal == false) {
            ctx.fillStyle = "#005679";
            ctx.fillRect(20, y_pad + w - 5, w, 5);
        }
        if (a.cells[0][1].reveal == false) {
            ctx.fillStyle = "#005679";
            ctx.fillRect(w + 20 - 5, y_pad, 5, w);
        }

    }

    for (let i = 1; i < c - 1; i++) {
        if (a.cells[0][i].reveal == false) {

            if (al == 0)
                ctx.fillStyle = clr1;
            else
                ctx.fillStyle = clr2;
            al_color();

        }
        else {

            if (al == 0)
                ctx.fillStyle = clr3;
            else
                ctx.fillStyle = clr4;
            al_color();

        }
        ctx.fillRect(i * w + i * gap + 20, y_pad, w, w);
        if (a.cells[0][i].reveal == true) {
            if (a.cells[0][i + 1].reveal == false) {
                ctx.fillStyle = "#005679";
                ctx.fillRect(20 + gap * (i + 1) + (i + 1) * w - 5, y_pad, 5, w);
            }
            if (a.cells[0][i - 1].reveal == false) {
                ctx.fillStyle = "#005679";
                ctx.fillRect(20 + gap * (i) + (i) * w, y_pad, 5, w);
            }
            if (a.cells[1][i].reveal == false) {
                ctx.fillStyle = "#005679";
                ctx.fillRect(20 + gap * i + i * w, w + y_pad - 5, w, 5);
            }
        }

        if (a.cells[0][i].reveal == true && a.cells[0][i].value != 0) {
            ctx.fillStyle = ctx.fillStyle = txt_clr[a.cells[0][i].value - 1];;
            ctx.fillText(a.cells[0][i].value, i * w + i * gap + 20 + x_push, y_pad + y_push);
        }
        if (a.flag[0][i] == true && a.cells[0][i].reveal == false)
            ctx.drawImage(flag_img, 20 + i * w + i * gap + 0.6 * x_push, y_pad + 0.2 * y_push, 0.7 * w, 0.7 * w);
    }

    if (a.cells[0][c - 1].reveal == false) {
        if (al == 0)
            ctx.fillStyle = clr1;
        else
            ctx.fillStyle = clr2;
        al_color();

    }
    else {
        if (al == 0)
            ctx.fillStyle = clr3;
        else
            ctx.fillStyle = clr4;
        al_color();
    }
    drawSquircle(ctx, (c - 1) * w + (c - 1) * gap + 20, y_pad, w, w, {
        radius: 50,
        smoothing: 0.8,
        corners: { tl: false, tr: true, br: false, bl: false }
    });
    ctx.fill();
    if (a.cells[0][c - 1].reveal == true) {
        if (a.cells[1][c - 1].reveal == false) {
            ctx.fillStyle = "#005679";
            ctx.fillRect((c - 1) * w + 20 + gap * (c - 1), w + y_pad - 5, w, 5);
        }
        if (a.cells[0][c - 2].reveal == false) {
            ctx.fillStyle = "#005679";
            ctx.fillRect((c - 1) * w + 20 + gap * (c - 1), y_pad, 5, w);
        }
    }
    ;
    if (a.cells[0][c - 1].reveal == true && a.cells[0][c - 1].value != 0) {
        ctx.fillStyle = txt_clr[a.cells[0][c - 1].value - 1];
        ctx.fillText(a.cells[0][c - 1].value, (c - 1) * w + (c - 1) * gap + 20 + x_push, y_pad + y_push);
    }
    if (a.flag[0][c - 1] == true && a.cells[0][c - 1].reveal == false)
        ctx.drawImage(flag_img, 20 + (c - 1) * w + (c - 1) * gap + 0.6 * x_push, y_pad + 0.2 * y_push, 0.7 * w, 0.7 * w);
    for (let j = 1; j < r - 1; j++) {
        al_color();
        for (let i = 0; i < c; i++) {
            if (a.cells[j][i].reveal == false) {
                if (al == 0)
                    ctx.fillStyle = clr1;
                else
                    ctx.fillStyle = clr2;
                al_color();
            }
            else {
                if (al == 0)
                    ctx.fillStyle = clr3;
                else
                    ctx.fillStyle = clr4;
                al_color();
            }
            ctx.fillRect(i * w + i * gap + 20, j * w + j * gap + y_pad, w, w);

            if (a.cells[j][i].reveal == true) {
                if (a.cells[j - 1][i].reveal == false) {
                    ctx.fillStyle = "#005679";
                    ctx.fillRect(gap * i + i * w + 20, (j) * gap + (j) * w + y_pad, w, 5);
                    if (i - 1 >= 0 && a.cells[j - 1][i - 1].reveal == true && (i - 1) > 0 && a.cells[j][i - 1].reveal == true) {
                        ctx.fillRect((i) * w + 20 - 5, j * w + y_pad, 5, 5);
                    }
                }
                if ((i + 1) < c && a.cells[j][i + 1].reveal == false) {
                    ctx.fillStyle = "#005679";
                    ctx.fillRect(gap * (i + 1) + (i + 1) * w + 20 - 5, (j) * gap + (j) * w + y_pad, 5, w);
                    if (i + 1 < c && a.cells[j - 1][i + 1].reveal == true && a.cells[j - 1][i].reveal == true) {
                        ctx.fillRect((i + 1) * w + 20 - 5, j * w - 5 + y_pad, 5, 5);
                    }
                }
                if ((i - 1) >= 0 && a.cells[j][i - 1].reveal == false) {
                    ctx.fillStyle = "#005679";
                    ctx.fillRect(gap * (i) + (i) * w + 20, (j) * gap + (j) * w + y_pad, 5, w);
                    if (i + 1 < c && a.cells[j - 1][i - 1].reveal == true && a.cells[j - 1][i].reveal == true) {
                        ctx.fillRect((i) * w + 20, j * w - 5 + y_pad, 5, 5);
                    }
                }
                if ((j + 1) < r && a.cells[j + 1][i].reveal == false) {
                    ctx.fillStyle = "#005679";
                    ctx.fillRect(gap * (i) + (i) * w + 20, (j) * gap + (j) * w + w - 5 + y_pad, w, 5);
                    // if (i + 1 < c && a.cells[j - 1][i - 1].reveal == true && a.cells[j - 1][i].reveal == true) {
                    //     ctx.fillRect((i) * w + 20 - 5, j * w - 5 + y_pad, 5, 5);
                    // }
                }
                if (i - 1 >= 0 && j - 1 >= 0 && a.cells[j][i - 1].reveal == true && a.cells[j - 1][i].reveal == true && a.cells[j - 1][i - 1].reveal == false) {
                    ctx.fillStyle = "#005679";
                    ctx.fillRect(gap * (i) + (i) * w + 20, (j) * gap + (j) * w + y_pad, 5, 5);
                }
            }




            if (a.cells[j][i].reveal == true && a.cells[j][i].value != 0) {
                ctx.fillStyle = txt_clr[a.cells[j][i].value - 1];
                ctx.fillText(a.cells[j][i].value, i * w + i * gap + 20 + x_push, j * w + j * gap + y_pad + y_push);
            }
            if (a.flag[j][i] == true && a.cells[j][i].reveal == false)
                ctx.drawImage(flag_img, 20 + i * w + i * gap + 0.6 * x_push, j * w + j * gap + y_pad + 0.2 * y_push, 0.7 * w, 0.7 * w);

        }
    }
    al_color();

    if (a.cells[r - 1][0].reveal == false) {
        if (al == 0)
            ctx.fillStyle = clr1;
        else
            ctx.fillStyle = clr2;
    }
    else {
        if (al == 0)
            ctx.fillStyle = clr3;
        else
            ctx.fillStyle = clr4;
    }
    drawSquircle(ctx, 20, (r - 1) * w + (r - 1) * gap + y_pad, w, w, {
        radius: 50,
        smoothing: 0.8,
        corners: { tl: false, tr: false, br: false, bl: true }
    });
    ctx.fill();

    if (a.cells[r - 1][0].reveal == true) {
        if (a.cells[r - 2][0].reveal == false) {
            ctx.fillStyle = "#005679";
            ctx.fillRect(gap * 0 + 0 * w + 20, (r - 1) * gap + (r - 1) * w + y_pad, w, 5);
        }
        if (a.cells[r - 1][1].reveal == false) {
            ctx.fillStyle = "#005679";
            ctx.fillRect(gap * 1 + 1 * w + 20 - 5, (r - 1) * gap + (r - 1) * w + y_pad, 5, w);
            if (a.cells[r - 2][1].reveal == true && a.cells[r - 2][0].reveal == true) {
                ctx.fillRect((1) * w + 20 - 5, (r - 1) * w - 5 + y_pad, 5, 5);
            }
        }
    }


    if (a.cells[r - 1][0].reveal == true && a.cells[r - 1][0].value != 0) {
        ctx.fillStyle = txt_clr[a.cells[r - 1][0].value - 1];
        ctx.fillText(a.cells[r - 1][0].value, 20 + x_push, (r - 1) * w + (r - 1) * gap + y_pad + y_push);
    }
    if (a.flag[r - 1][0] == true && a.cells[r - 1][0].reveal == false)
        ctx.drawImage(flag_img, 20 + 0 * w + 0 * gap + 0.6 * x_push, (r - 1) * w + (r - 1) * gap + y_pad + 0.2 * y_push, 0.7 * w, 0.7 * w);

    al_color();
    for (let i = 1; i < (c - 1); i++) {
        if (a.cells[r - 1][i].reveal == false) {
            if (al == 0)
                ctx.fillStyle = clr1;
            else
                ctx.fillStyle = clr2;
            al_color();
        }
        else {
            if (al == 0)
                ctx.fillStyle = clr3;
            else
                ctx.fillStyle = clr4;
            al_color();
        }
        ctx.fillRect(i * w + i * gap + 20, (r - 1) * w + (r - 1) * gap + y_pad, w, w);
        if (a.cells[r - 1][i].reveal == true) {
            if (a.cells[r - 1][i - 1].reveal == false) {
                ctx.fillStyle = "#005679";
                ctx.fillRect(gap * i + i * w + 20, (r - 1) * gap + (r - 1) * w + y_pad, 5, w);
                if (a.cells[r - 2][i - 1].reveal == true && a.cells[r - 2][i].reveal == true) {
                    ctx.fillRect((i) * w + 20 - 5, (r - 1) * w - 5 + y_pad, 5, 5);
                }
            }

            if (a.cells[r - 1][i - 1].reveal == false) {
                ctx.fillStyle = "#005679";
                ctx.fillRect(gap * i + i * w + 20, (r - 1) * gap + (r - 1) * w + y_pad, 5, w);
                if (a.cells[r - 2][i - 1].reveal == true && a.cells[r - 2][i].reveal == true) {
                    console.log("imm");
                    ctx.fillRect((i) * w + 20, (r - 1) * w - 5 + y_pad, 5, 5);
                }
            }
            if (a.cells[r - 1][i + 1].reveal == false) {
                ctx.fillStyle = "#005679";
                ctx.fillRect(gap * (i + 1) + (i + 1) * w + 20 - 5, (r - 1) * gap + (r - 1) * w + y_pad, 5, w);
                if (a.cells[r - 2][i + 1].reveal == true && a.cells[r - 2][i].reveal == true) {
                    console.log("imm");
                    ctx.fillRect((i + 1) * w + 20 - 5, (r - 1) * w - 5 + y_pad, 5, 5);
                }
            }
            if (a.cells[r - 2][i].reveal == false) {
                ctx.fillStyle = "#005679";
                ctx.fillRect(gap * (i) + (i) * w + 20, (r - 1) * gap + (r - 1) * w + y_pad, w, 5);
                if (a.cells[r - 2][i - 1].reveal == true && a.cells[r - 1][i - 1].reveal == true) {
                    console.log("imm");
                    ctx.fillRect((i) * w + 20 - 5, (r - 1) * w + y_pad, 5, 5);
                }
                if (a.cells[r - 1][i - 1].reveal == true && a.cells[r - 2][i].reveal == true)
                    ctx.fillRect((i) * w + 20, (r - 1) * w + y_pad, 5, 5);
            }
        }



        if (a.cells[r - 1][i].reveal == true && a.cells[r - 1][i].value != 0) {
            ctx.fillStyle = txt_clr[a.cells[r - 1][i].value - 1];
            ctx.fillText(a.cells[r - 1][i].value, i * w + i * gap + 20 + x_push, (r - 1) * w + (r - 1) * gap + y_pad + y_push);
        }
        if (a.flag[r - 1][i] == true && a.cells[r - 1][i].reveal == false)
            ctx.drawImage(flag_img, 20 + i * w + i * gap + 0.6 * x_push, (r - 1) * w + (r - 1) * gap + y_pad + 0.2 * y_push, 0.7 * w, 0.7 * w);

    }

    if (a.cells[r - 1][c - 1].reveal == false) {
        if (al == 0)
            ctx.fillStyle = clr1;
        else
            ctx.fillStyle = clr2;
    }
    else {
        if (al == 0)
            ctx.fillStyle = clr3;
        else
            ctx.fillStyle = clr4;
    }
    drawSquircle(ctx, (c - 1) * (w + gap) + 20, (r - 1) * w + (r - 1) * gap + y_pad, w, w, {
        radius: 50,
        smoothing: 0.8,
        corners: { tl: false, tr: false, br: true, bl: false }
    });
    ctx.fill();
    if (a.cells[r - 1][c - 1].reveal == true && a.cells[r - 1][c - 1].value != 0) {
        ctx.fillStyle = txt_clr[a.cells[r - 1][c - 1].value - 1];
        ctx.fillText(a.cells[r - 1][c - 1].value, (c - 1) * w + (c - 1) * gap + 20 + x_push, (r - 1) * w + (r - 1) * gap + y_pad + y_push);
    }
    if (a.flag[r - 1][c - 1] == true && a.cells[r - 1][c - 1].reveal == false)
        ctx.drawImage(flag_img, 20 + (c - 1) * w + (c - 1) * gap + 0.6 * x_push, (r - 1) * w + (r - 1) * gap + y_pad + 0.2 * y_push, 0.7 * w, 0.7 * w);

    const buffer = document.createElement("canvas");
    buffer.width = canvas.width;
    buffer.height = canvas.height;

    const bctx = buffer.getContext("2d");

    // Copy current canvas
    bctx.drawImage(canvas, 0, 0);

    // Clear original
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw copied image with shadow
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 5;

    ctx.drawImage(buffer, 0, 0);
    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

}





// // Paper-like noise
// function mulberry32(seed) {
//     return function () {
//         let t = seed += 0x6D2B79F5;
//         t = Math.imul(t ^ (t >>> 15), t | 1);
//         t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
//         return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
//     };
// }

// const rand = mulberry32(12345); // same seed = same noise

// const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
// const data = img.data;

// for (let i = 0; i < data.length; i += 4) {
//     const noise = (rand() - 0.5) * 30;

//     data[i] += noise;
//     data[i + 1] += noise;
//     data[i + 2] += noise;
// }






// Create once
const noiseCanvas = document.createElement("canvas");
noiseCanvas.width = canvas.width;
noiseCanvas.height = canvas.height;

const maskedNoiseCanvas = document.createElement("canvas");
maskedNoiseCanvas.width = canvas.width;
maskedNoiseCanvas.height = canvas.height;

const nctx = noiseCanvas.getContext("2d");
const mnctx = maskedNoiseCanvas.getContext("2d");

const img = nctx.createImageData(canvas.width, canvas.height);
const data = img.data;

for (let i = 0; i < data.length; i += 4) {

    const v = Math.random() < 0.05 ? 127.5 : 0;

    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
    data[i + 3] = v;
}
nctx.putImageData(img, 0, 0);



function add_noise() {
    // Build masked noise using current canvas contents
    mnctx.clearRect(0, 0, canvas.width, canvas.height);

    mnctx.drawImage(noiseCanvas, 0, 0);

    mnctx.globalCompositeOperation = "destination-in";
    mnctx.drawImage(canvas, 0, 0);

    mnctx.globalCompositeOperation = "source-over";

    // Draw masked noise on top
    ctx.globalAlpha = 0.4;
    ctx.drawImage(maskedNoiseCanvas, 0, 0);
    ctx.globalAlpha = 1;
}

function first_click(e) {

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;

    if (mx > 20 && mx < 790 && my > y_pad && my < (900 - y_pad)) {
        let mc = parseInt((mx - 20) / (w + gap));
        let mr = parseInt((my - y_pad) / (w + gap));

        a.placeMines(a.per, mc, mr);
        bfs(mc, mr);
        render_grid()
        canvas.removeEventListener("click", first_click);
        canvas.addEventListener("click", game_click);
    }
}


function game_click(e) {
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;
    console.log(mx, my);
    if (mx > 20 && mx < 774 && my > y_pad && my < (900 - y_pad)) {
        let mc = parseInt((mx - 20) / (w + gap));
        let mr = parseInt((my - y_pad) / (w + gap));
        bfs(mc, mr);
        if (game_over == false) {
            render_grid()
        }
        if (rem_cells == 0) {
            game_over = true;
            ctx.fillStyle = "#000000a8";
            drawSquircle(ctx, 20 - 5, y_pad - 5, c * w + 10, c * w + 10, {
                radius: 45,
                smoothing: 0.8,
                corners: { tl: true, tr: true, br: true, bl: true }
            });
            ctx.fill();
            ctx.font = "100px serif";
            ctx.fillStyle = "#ffd000e2";
            ctx.fillText("You Won!", canvas.width / 2 - 200, canvas.height / 2 + 25);
        }
    }
}

canvas.addEventListener("click", first_click);


render_grid();

