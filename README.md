# TOEFL Weak Area Finder

A short diagnostic across the four skills, combined with your results in other apps, to show what to study next.

Part of the [GRE and TOEFL Study Suite](https://github.com/Apurba94/gre-toefl-study-suite): 100 free study apps for the TOEFL iBT and more. It works offline, as a Windows program or in the browser.

## Download and run

- **Windows:** download `TOEFL Weak Area Finder.exe` from the [latest release](https://github.com/Apurba94/toefl-weak-area-finder/releases/latest) and open it. Nothing to install. It opens in its own window and saves your progress in your user folder.
- **Browser:** open it online in the suite's web edition at https://gre-toefl-study-suite.vercel.app/apps/toefl-weak-area-finder/ . Progress stays in that browser.
- **From source:** `python launcher.py` (Python 3.10 or later, no packages needed).

## What it does

Fifteen items across reading, Complete the Words, listening, Build a Sentence and grammar, combined with your results in every other TOEFL app, show your weakest skills, with a link to the app that trains each.

Sections: Diagnostic, Report, Progress, About.

## How to use it

1. Turn on sound and press **Start the diagnostic**. It takes about 15 minutes.
2. Read the **Report**, which grows more reliable as you practise in other apps.

## Good to know

- All questions, passages and definitions were written for this suite. None are official ETS questions. For official practice, use the materials on ets.org.
- It follows the GRE General Test as shortened in September 2023 and the TOEFL iBT as updated in January 2026. Formats change, so check ets.org before your test.
- Feedback on writing and speaking counts things a program can count honestly, such as length and linking words. It does not give an official score.
- Not endorsed by or affiliated with ETS. GRE and TOEFL are registered trademarks of ETS.

## For developers

The app is plain HTML and JavaScript in `web/`, run by a small Python launcher that serves it on 127.0.0.1 only and needs a secret token for saving. Tests: `node --test "tests/*.test.js"` (23 tests) and `python -m unittest discover -s tests`. Build the .exe with `python build_exe.py`.

Built with AI assistance (Claude Code). MIT licence. By JANIN A APURBA.
