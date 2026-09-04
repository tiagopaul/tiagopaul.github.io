/* =====================================================
   NEW / UPDATED FLAGS
   Each flag carries data-flag-date="YYYY-MM-DD".
   The badge is hidden in CSS and revealed here only if
   that date is within FLAG_MONTHS of today, so flags
   retire themselves with no maintenance.
===================================================== */

(function () {
    var FLAG_MONTHS = 3;

    document.addEventListener('DOMContentLoaded', function () {
        var now = new Date();

        document.querySelectorAll('.flag').forEach(function (flag) {
            var raw = flag.dataset.flagDate;
            if (!raw) return;

            var set = new Date(raw);
            if (isNaN(set)) return;

            var expires = new Date(set.getFullYear(), set.getMonth() + FLAG_MONTHS, set.getDate());
            if (now > expires) return;

            flag.classList.add('visible');

            var note = flag.parentElement.querySelector('.flag-note');
            if (!note) return;

            function open() {
                note.classList.add('open');
                flag.setAttribute('aria-expanded', 'true');
            }

            function close() {
                note.classList.remove('open');
                flag.setAttribute('aria-expanded', 'false');
            }

            function toggle(e) {
                e.stopPropagation();
                note.classList.contains('open') ? close() : open();
            }

            flag.addEventListener('mouseenter', open);
            flag.parentElement.addEventListener('mouseleave', close);
            flag.addEventListener('click', toggle);
            flag.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle(e);
                }
            });
            document.addEventListener('click', close);
        });
    });
})();
