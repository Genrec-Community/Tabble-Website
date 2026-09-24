#!/usr/bin/env python3
"""Double-fork daemonizer — escapes the tool-session process group so the
Next.js dev server survives across bash tool invocations."""
import os
import sys
import subprocess

PROJECT = "/home/z/my-project"


def main():
    # already running?
    try:
        import urllib.request
        urllib.request.urlopen("http://localhost:3000/", timeout=2)
        print("SERVER_ALREADY_UP")
        return
    except Exception:
        pass

    # fork #1
    pid = os.fork()
    if pid > 0:
        # parent: wait briefly, then exit (child is reparented to init)
        import time
        time.sleep(1)
        print("DAEMON_LAUNCHED")
        return

    os.setsid()  # new session, detach from controlling terminal

    # fork #2 — guarantee the daemon can never re-acquire a terminal
    pid = os.fork()
    if pid > 0:
        os._exit(0)

    # redirect stdio to dev.log path so pipes never break
    log = open(os.path.join(PROJECT, "dev.log"), "ab", 0)
    os.dup2(log.fileno(), 1)
    os.dup2(log.fileno(), 2)
    os.chdir(PROJECT)

    subprocess.run(
        ["bun", "run", "dev"],
        cwd=PROJECT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        env={**os.environ, "NODE_ENV": "development"},
    )


if __name__ == "__main__":
    main()
