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
	$(MAKE) horizontal
	$(MAKE) vertical

horizontal:
	node generateHTML.js > index.html
	xdg-open index.html

vertical:
	node generateHTML.js --vertical > index-vertical.html
	xdg-open index-vertical.html
