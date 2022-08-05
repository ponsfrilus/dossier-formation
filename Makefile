md: out.md
	node index.js > out.md

pdf:
	$(MAKE) md
	pandoc out.md \
		--pdf-engine=xelatex \
		--variable urlcolor=cyan \
		-V papersize:a4paper \
		-V geometry:margin=2cm \
		-o out.pdf && \
		xdg-open out.pdf

html:
	npm i --quiet
	node generateHTML.js > out.html
	xdg-open out.html

horizontal:
	$(MAKE) html

vertical:
	npm i --quiet
	node generateHTML.js --vertical > out-v.html
	xdg-open out-v.html
