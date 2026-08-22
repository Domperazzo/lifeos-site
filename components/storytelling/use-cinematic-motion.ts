"use client";

import { useEffect, type RefObject } from "react";

type GsapModule = typeof import("gsap");
type ScrollTriggerModule = typeof import("gsap/ScrollTrigger");

const scrub = 0.8;

export function useCinematicMotion(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollModule]: [GsapModule, ScrollTriggerModule]) => {
        if (disposed || !root.current) return;

        const { gsap } = gsapModule;
        const { ScrollTrigger } = scrollModule;
        gsap.registerPlugin(ScrollTrigger);
        const compact = window.matchMedia("(max-width: 767px)").matches;

        const debug =
          process.env.NODE_ENV !== "production" &&
          new URLSearchParams(window.location.search).get("motionDebug") === "true";

        if (debug) root.current.dataset.motionDebug = "true";

        const context = gsap.context(() => {
          const scene = (name: string) => root.current?.querySelector<HTMLElement>(`[data-scene="${name}"]`);
          const config = (trigger: Element) => ({
            trigger,
            start: "top top",
            end: "bottom bottom",
            scrub,
            markers: debug,
          });

          const hero = scene("hero");
          if (hero) {
            gsap
              .timeline({ scrollTrigger: config(hero) })
              .to(hero.querySelector("[data-hero-copy]"), { opacity: 0, y: -80, ease: "none" }, 0.35)
              .to(hero.querySelector("[data-device-stage]"), { yPercent: -12, scale: 0.9, ease: "none" }, 0.15)
              .to(hero.querySelector("[data-hero-aura]"), { opacity: 0.18, scale: 0.8, ease: "none" }, 0.15);
          }

          const areas = scene("areas");
          if (areas) {
            const labels = gsap.utils.toArray<HTMLElement>(areas.querySelectorAll("[data-area-label]"));
            gsap.set(labels, { opacity: 0, scale: 0.88 });
            gsap.set(areas.querySelector("[data-scene-copy]"), { opacity: 0, y: 36 });
            const timeline = gsap.timeline({ scrollTrigger: config(areas) });
            labels.forEach((label, index) => {
              timeline.to(label, { opacity: 1, scale: 1, duration: 0.14, ease: "power2.out" }, 0.08 + index * 0.1);
            });
            timeline
              .to(areas.querySelector("[data-device-stage]"), { rotateY: compact ? 0 : -5, xPercent: compact ? 0 : 22, scale: compact ? 1 : 1.06, duration: 0.34, ease: "none" }, 0.48)
              .to(areas.querySelector("[data-scene-copy]"), { opacity: 1, y: 0, duration: 0.22 }, 0.62)
              .to(labels, { xPercent: (index) => (index % 2 === 0 ? 45 : -45), yPercent: -10, opacity: 0, duration: 0.22 }, 0.8);
          }

          const today = scene("today");
          if (today) {
            const cards = gsap.utils.toArray<HTMLElement>(today.querySelectorAll("[data-today-card]"));
            const beats = gsap.utils.toArray<HTMLElement>(today.querySelectorAll("[data-today-beat]"));
            gsap.set(beats, { opacity: 0, y: 24 });
            const timeline = gsap.timeline({ scrollTrigger: config(today) });
            timeline.to(today.querySelector("[data-device-stage]"), { scale: compact ? 1.04 : 1.22, xPercent: compact ? 0 : -18, duration: 0.25, ease: "none" });
            beats.forEach((beat, index) => {
              const position = 0.1 + index * 0.27;
              timeline
                .to(beats, { opacity: 0, y: -12, duration: 0.08 }, position)
                .to(beat, { opacity: 1, y: 0, duration: 0.12 }, position + 0.03)
                .to(cards, { opacity: 0.28, filter: "saturate(.65)", duration: 0.1 }, position)
                .to(cards[Math.min(index, cards.length - 1)], { opacity: 1, filter: "saturate(1)", scale: 1.025, duration: 0.12 }, position + 0.02);
            });
            timeline.to(today.querySelector("[data-device-stage]"), { scale: 0.98, xPercent: compact ? 0 : 16, duration: 0.2 }, 0.86);
          }

          const home = scene("home");
          if (home) {
            const beats = gsap.utils.toArray<HTMLElement>(home.querySelectorAll("[data-home-beat]"));
            gsap.set(beats, { opacity: 0, y: 24 });
            const timeline = gsap.timeline({ scrollTrigger: config(home) });
            timeline
              .to(beats[0], { opacity: 1, y: 0, duration: 0.2 }, 0.2)
              .to(home.querySelector("[data-device-primary]"), { opacity: 0, filter: "blur(8px)", duration: 0.18 }, 0.48)
              .to(home.querySelector("[data-device-alternate]"), { opacity: 1, duration: 0.18 }, 0.48)
              .to(beats[0], { opacity: 0, y: -20, duration: 0.12 }, 0.53)
              .to(beats[1], { opacity: 1, y: 0, duration: 0.18 }, 0.6)
              .to(home.querySelector("[data-automation-pulse]"), { scale: 1.8, opacity: 0, duration: 0.35 }, 0.62);
          }

          const wealth = scene("wealth");
          if (wealth) {
            const metrics = gsap.utils.toArray<HTMLElement>(wealth.querySelectorAll("[data-wealth-metric]"));
            gsap.set(metrics, { opacity: 0, y: 22 });
            const line = wealth.querySelector<SVGPathElement>("[data-wealth-line]");
            if (line) {
              const length = line.getTotalLength();
              gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
            }
            const timeline = gsap.timeline({ scrollTrigger: config(wealth) });
            timeline
              .to(wealth.querySelector("[data-device-stage]"), { scale: compact ? 1.02 : 1.1, xPercent: compact ? 0 : -12, duration: 0.28 }, 0.05)
              .to(line, { strokeDashoffset: 0, duration: 0.42, ease: "none" }, 0.28);
            metrics.forEach((metric, index) => {
              timeline.to(metric, { opacity: 1, y: 0, duration: 0.14 }, 0.48 + index * 0.1);
            });
          }

          const automations = scene("automations");
          if (automations) {
            gsap.timeline({ scrollTrigger: config(automations) })
              .fromTo(
                automations.querySelector("[data-device-stage]"),
                { yPercent: 8, scale: 0.94 },
                { yPercent: -6, scale: compact ? 1 : 1.06, ease: "none", duration: 1 },
                0,
              )
              .fromTo(
                automations.querySelector(".automations-copy"),
                { opacity: 0, y: 34 },
                { opacity: 1, y: 0, duration: 0.24 },
                0.06,
              );
          }

          const ask = scene("ask");
          if (ask) {
            // Le tre schermate sono tutte montate e sovrapposte: lo scrub
            // muove `opacity`, che sta sul compositor. Montarle a turno
            // farebbe ricalcolare il layout in mezzo all'animazione.
            const screens = gsap.utils.toArray<HTMLElement>(ask.querySelectorAll("[data-ask-screen]"));
            const questions = gsap.utils.toArray<HTMLElement>(ask.querySelectorAll("[data-ask-question]"));
            if (screens.length > 0) {
              gsap.set(screens.slice(1), { opacity: 0 });
              gsap.set(questions, { opacity: 0.3 });
              gsap.set(questions[0], { opacity: 1 });

              const timeline = gsap.timeline({ scrollTrigger: config(ask) });
              const slice = 0.78 / screens.length;

              screens.forEach((screen, index) => {
                if (index === 0) return;
                const at = 0.12 + slice * index;
                timeline
                  .to(screens[index - 1], { opacity: 0, duration: slice * 0.35 }, at)
                  .to(screen, { opacity: 1, duration: slice * 0.35 }, at)
                  .to(questions[index - 1], { opacity: 0.3, duration: slice * 0.3 }, at)
                  .to(questions[index], { opacity: 1, duration: slice * 0.3 }, at);
              });
            }
          }

          const devices = scene("devices");
          if (devices) {
            // Scena non pinnata: l'ingresso si innesca all'entrata in
            // viewport e finisce. Uno scrub qui rimetterebbe in movimento
            // la composizione mentre il visitatore ci sta cliccando dentro.
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: devices,
                  start: "top 78%",
                  end: "top 32%",
                  scrub,
                  markers: debug,
                },
              })
              .fromTo(
                devices.querySelector("[data-devices-heading]"),
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.4 },
                0,
              )
              .fromTo(
                devices.querySelector("[data-devices-composition]"),
                { opacity: 0, y: 70, scale: 0.94 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6 },
                0.15,
              )
              .fromTo(
                devices.querySelector("[data-devices-controls]"),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.3 },
                0.45,
              );
          }

          const connected = scene("connected");
          if (connected) {
            const signals = gsap.utils.toArray<HTMLElement>(connected.querySelectorAll("[data-signal]"));
            gsap.set(signals, { opacity: 0, scale: 0.8 });
            gsap.set(connected.querySelector("[data-connected-answer]"), { opacity: 0, y: 20 });
            const timeline = gsap.timeline({ scrollTrigger: config(connected) });
            signals.forEach((signal, index) => {
              timeline.to(signal, { opacity: 1, scale: 1, duration: 0.12 }, 0.08 + index * 0.07);
            });
            timeline
              .to(connected.querySelector("[data-device-stage]"), { scale: 0.82, duration: 0.2 }, 0.08)
              .to(signals, { left: "50%", top: "50%", scale: 0.56, opacity: 0, duration: 0.34, ease: "power2.in" }, 0.58)
              .to(connected.querySelector("[data-device-stage]"), { scale: 1.08, rotateY: 0, duration: 0.28 }, 0.64)
              .to(connected.querySelector("[data-connected-answer]"), { opacity: 1, y: 0, duration: 0.16 }, 0.8);
          }
        }, element);

        /*
          ScrollTrigger misura start ed end una volta sola, alla creazione.
          Ma la pagina è alta oltre trenta schermate e il suo layout non è
          definitivo al primo frame: i font caricano, le schermate dentro i
          device si compongono, le immagini arrivano. Ogni cambio d'altezza
          sopra una scena sposta quella scena e lascia i trigger dove non
          c'è più niente — la scena resta a opacità 0 e il visitatore vede
          un buco nero. Un refresh a `load` rimette tutto in riga.
        */
        const refresh = () => ScrollTrigger.refresh();
        if (document.readyState === "complete") {
          refresh();
        } else {
          window.addEventListener("load", refresh, { once: true });
        }

        // I font web arrivano dopo `load` e cambiano l'altezza dei titoli.
        void document.fonts?.ready.then(refresh);

        cleanup = () => {
          window.removeEventListener("load", refresh);
          context.revert();
        };
      },
    );

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [root]);
}
