// loadingAnimation.js

class LoadingAnimation {
    constructor() {
        this.loadChars = ['Loading ——🚀     ', 'Loading \\...🚀    ', 'Loading \|....🚀   ', 'Loading /.....🚀  ', 'Loading ——.......'];
        this._stopLoadingAnimation = false;
        this.interval = null;
        process.stdout.write("\x1B[?25l"); // Hide the cursor on the terminal screen
        process.on('exit', () => {
            process.stdout.write("\x1B[?25h"); // Show the cursor on exit
        });
        process.on('SIGINT', () => {
            process.stdout.write("\x1B[?25h"); // Show the cursor on Ctrl+C
            process.exit();
        });
    }

    startLoadingAnimation() {
        this._stopLoadingAnimation = false;
        let i = 0;
        this.interval = setInterval(() => {
            process.stdout.write('\r' + this.loadChars[i]);
            i = (i + 1) % this.loadChars.length;
        }, 200);
    }

    stopLoadingAnimation() {
        clearInterval(this.interval);
        this._stopLoadingAnimation = true;
        process.stdout.write('\r' + ' '.repeat(this.loadChars[0].length) + '\r'); // Clear the loading line
    }
}

/*
// testing
let la=new LoadingAnimation();
la.startLoadingAnimation();
setTimeout(function(){
    la.stopLoadingAnimation();
    let i=0;
    while(++i<=10)console.log('hi hi ')
    la.startLoadingAnimation();
    },2000);
*/
exports.LoadingAnimation=LoadingAnimation;