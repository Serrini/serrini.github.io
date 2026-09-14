(() => {
    "use strict";

    const root = document.documentElement;
    const body = document.body;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setupReveal = () => {
        const items = document.querySelectorAll(".reveal-item");
        if (!items.length || reduceMotion || !("IntersectionObserver" in window)) {
            items.forEach((item) => item.classList.add("is-visible"));
            return;
        }
        body.classList.add("is-reveal-ready");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -25px" });
        items.forEach((item) => observer.observe(item));
    };

    const setupHero = () => {
        const hero = document.querySelector(".os-hero");
        const word = document.querySelector("[data-rotating-word]");
        if (hero && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
            hero.addEventListener("pointermove", (event) => {
                const rect = hero.getBoundingClientRect();
                hero.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
                hero.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
            }, { passive: true });
        }
        if (!word || reduceMotion) return;
        const words = ["LLM", "Agent", "System", "Research", "EDA"];
        let index = 0;
        window.setInterval(() => {
            word.classList.add("is-changing");
            window.setTimeout(() => {
                index = (index + 1) % words.length;
                word.textContent = words[index];
                word.classList.remove("is-changing");
            }, 220);
        }, 2400);
    };

    const setupTerminal = () => {
        const terminal = document.querySelector("[data-terminal]");
        if (!terminal) return;
        const form = terminal.querySelector("[data-terminal-form]");
        const input = terminal.querySelector("[data-terminal-input]");
        const output = terminal.querySelector("[data-terminal-output]");
        const commands = {
            help: "Commands: <strong>projects</strong> · <strong>research</strong> · <strong>writing</strong> · <strong>lab</strong> · <strong>now</strong> · <strong>whoami</strong> · <strong>clear</strong>",
            projects: 'Selected systems → <a href="/projects/">open ~/projects ↗</a>',
            research: 'Connected topics → <a href="/research/">open ~/research ↗</a>',
            writing: 'Engineering notes → <a href="/posts/">open ~/writing ↗</a>',
            notes: 'Engineering notes → <a href="/posts/">open ~/writing ↗</a>',
            lab: 'Interactive experiments → <a href="/lab/">open ~/lab ↗</a>',
            now: 'Currently building LLM × EDA workflows → <a href="/now/">open ~/now ↗</a>',
            about: 'About this system → <a href="/about/">open ~/about ↗</a>',
            whoami: 'Serrini — AI Engineer connecting models, agents and systems. <a href="/about/">more ↗</a>',
            pwd: "/home/serrini/research-os",
            ls: "about/ &nbsp; research/ &nbsp; projects/ &nbsp; writing/ &nbsp; lab/ &nbsp; now/"
        };

        const run = (raw) => {
            const command = raw.trim().toLowerCase().replace(/^~\//, "");
            if (!command) return;
            if (command === "clear") {
                output.textContent = "";
            } else if (commands[command]) {
                output.innerHTML = commands[command];
            } else {
                const safeCommand = command.replace(/[<>&"']/g, "");
                output.innerHTML = `command not found: <strong>${safeCommand}</strong>. Try <strong>help</strong>.`;
            }
            input.value = "";
        };

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            run(input.value);
        });
        terminal.querySelectorAll("[data-command]").forEach((button) => {
            button.addEventListener("click", () => run(button.dataset.command));
        });
    };

    const setupCounters = () => {
        const counters = document.querySelectorAll("[data-count]");
        if (!counters.length) return;
        const animate = (counter) => {
            const target = Number(counter.dataset.count);
            if (reduceMotion) { counter.textContent = target; return; }
            const start = performance.now();
            const tick = (now) => {
                const progress = Math.min((now - start) / 900, 1);
                counter.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
                if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };
        if (!("IntersectionObserver" in window)) { counters.forEach(animate); return; }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                animate(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: .5 });
        counters.forEach((counter) => observer.observe(counter));
    };

    const setupKnowledgeMap = () => {
        const map = document.querySelector("[data-knowledge-map]");
        if (!map) return;
        const detail = map.querySelector("[data-topic-detail]");
        const topics = {
            core: ["Research OS", "从中心开始探索。Agent、GUI、Systems 与 EDA 相互提供方法、工具和工程约束。", "#tracks", "Browse all tracks ↓"],
            agent: ["Agent Systems", "任务分解、工具调用、记忆与多 Agent 编排。", "#agent", "Open Agent track ↓"],
            gui: ["GUI & Multimodal", "让模型理解屏幕、定位目标，并完成观察—行动—纠错闭环。", "#gui", "Open GUI track ↓"],
            systems: ["Systems", "并发、协议、流式响应与运行时，是可靠 AI 系统的底座。", "#systems", "Open Systems track ↓"],
            eda: ["AI × EDA", "从电路生成和网表理解，到仿真验证与自动优化。", "#eda", "Open EDA track ↓"],
            multiagent: ["Multi-Agent", "研究角色划分、通信、并发协作、监督与批评者模式。", "/posts/多智能体架构multiagent/", "Read the note ↗"],
            tool: ["Tool Use", "把模型输出约束为可执行、可观察、可恢复的工具调用。", "/posts/agent工具接入/", "Read the note ↗"],
            grounding: ["GUI Grounding", "把自然语言指令准确映射到屏幕中的文本、图标和控件。", "/posts/精读seeclick/", "Read SeeClick note ↗"],
            vlm: ["Vision-Language Models", "连接视觉感知、语言推理与界面行动。", "#gui", "Open GUI track ↓"],
            protocol: ["Protocols", "TLS、Kerberos 与网络协议的安全边界和工程实现。", "/categories/security/", "Browse protocol notes ↗"],
            concurrency: ["Concurrency", "goroutine、channel 与 Agent 流式系统中的并发控制。", "/posts/go-chan/", "Read concurrency notes ↗"],
            simulation: ["Simulation", "让模型生成的电路接受真实仿真结果，而不是只做文本判断。", "#eda", "Open EDA track ↓"],
            netlist: ["Netlist", "连接电路结构理解、代码生成与 SPICE 验证的中间表示。", "#eda", "Open EDA track ↓"]
        };
        map.querySelectorAll("[data-topic]").forEach((button) => {
            button.addEventListener("click", () => {
                const topic = topics[button.dataset.topic];
                if (!topic) return;
                map.querySelectorAll("[data-topic]").forEach((node) => node.classList.remove("is-active"));
                button.classList.add("is-active");
                detail.querySelector("h2").textContent = topic[0];
                detail.querySelector("p").textContent = topic[1];
                const link = detail.querySelector("a");
                link.href = topic[2];
                link.textContent = topic[3];
            });
        });
    };

    const setupAttentionLab = () => {
        const lab = document.querySelector("[data-attention-lab]");
        if (!lab) return;
        const query = lab.querySelector("[data-attention-query]");
        const keys = [...lab.querySelectorAll("[data-attention-key]")];
        const sliders = [query, ...keys];
        const weights = [...lab.querySelectorAll("[data-weight]")];
        const bars = [...lab.querySelectorAll("[data-bar]")];
        const formula = lab.querySelector("[data-attention-formula]");
        const insight = lab.querySelector("[data-attention-insight]");
        const labels = ["love", "machine", "learning"];

        const update = () => {
            sliders.forEach((slider) => { slider.nextElementSibling.textContent = Number(slider.value).toFixed(1); });
            const q = Number(query.value);
            const scores = keys.map((key) => q * Number(key.value));
            const max = Math.max(...scores);
            const exp = scores.map((score) => Math.exp(score - max));
            const total = exp.reduce((sum, value) => sum + value, 0);
            const values = exp.map((value) => value / total);
            values.forEach((value, index) => {
                weights[index].textContent = value.toFixed(2);
                bars[index].style.width = `${(value * 100).toFixed(1)}%`;
            });
            formula.textContent = `softmax([${scores.map((score) => score.toFixed(2)).join(", ")}])`;
            const winner = values.indexOf(Math.max(...values));
            insight.textContent = `当前 Query 与 “${labels[winner]}” 的点积最高，因此获得最多注意力。`;
        };
        sliders.forEach((slider) => slider.addEventListener("input", update));
        update();
    };

    const setupReadingProgress = () => {
        const article = document.querySelector(".article-content");
        if (!article) return;
        const bar = document.createElement("div");
        bar.className = "reading-progress";
        bar.setAttribute("aria-hidden", "true");
        body.appendChild(bar);
        let ticking = false;
        const update = () => {
            const rect = article.getBoundingClientRect();
            const distance = Math.max(article.offsetHeight - window.innerHeight, 1);
            const progress = Math.min(Math.max(-rect.top / distance, 0), 1);
            bar.style.transform = `scaleX(${progress})`;
            ticking = false;
        };
        window.addEventListener("scroll", () => {
            if (!ticking) { requestAnimationFrame(update); ticking = true; }
        }, { passive: true });
        update();
    };

    const setupEasterEgg = () => {
        const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
        let position = 0;
        window.addEventListener("keydown", (event) => {
            position = event.key.toLowerCase() === code[position].toLowerCase() ? position + 1 : 0;
            if (position === code.length) { body.classList.toggle("cyber-mode"); position = 0; }
        });
        const avatar = document.querySelector(".site-avatar");
        if (avatar) {
            let clicks = 0;
            let timer;
            avatar.addEventListener("click", (event) => {
                clicks += 1;
                clearTimeout(timer);
                timer = setTimeout(() => { clicks = 0; }, 1800);
                if (clicks === 7) { event.preventDefault(); body.classList.toggle("cyber-mode"); clicks = 0; }
            });
        }
        console.log("%cHey developer 👋\nYou found the secret area.", "color:#8f80f5;font:700 16px monospace");
    };

    setupReveal();
    setupHero();
    setupTerminal();
    setupCounters();
    setupKnowledgeMap();
    setupAttentionLab();
    setupReadingProgress();
    setupEasterEgg();
})();
