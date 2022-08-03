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
	npm i
	node generateHTML.js > out.html
	xdg-open out.html
