while true; do
           nc -l -p 12345 -s localhost localhost > ~/.config/pianobar/ctl;
           sleep 1;
done

echo -ne 'n\x1a' | nc -q 0 127.0.0.1 12345

