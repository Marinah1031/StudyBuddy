import $ from 'jquery';

// Function to apply bounce animation
export function applyBounceAnimation() {
    var str = '#len'; // The selector for the elements to bounce, should be something like '#len1', '#len2', etc.

    $(document).ready(function () {
        var i, stop;
        i = 1;
        stop = 4; // Number of elements to apply the animation to

        // Set up a repeating interval for the animation
        setInterval(function () {
            if (i > stop) {
                return; // Stop the animation when all elements have been animated
            }
            // Toggle the 'bounce' class on the selected element
            $(str + i).toggleClass('bounce');
            i++;
        }, 500); // Interval duration in milliseconds (500ms = 0.5 seconds)
    });
}
