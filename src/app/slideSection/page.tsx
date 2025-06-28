"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

/**
 * @name SlideSectionPage
 * @description
 * このコンポーネントは、GSAPとReactのState管理を連携させるサンプルです。
 * 水平スライドセクション内で、ユーザーインタラクションとスクロールに応じた
 * 状態の更新・表示を行います。
 *
 * GSAPとReact連携のポイント:
 * - GSAPはDOMを直接操作し、ReactはStateに基づいてDOMを再構築します。
 * - `useGSAP`のスコープ内で生成されたアニメーションは、Reactの再レンダリングの影響を受けません。
 * - GSAPのコールバック(onUpdate, onSnapCompleteなど)からReactのState更新関数(例: setActiveSection)を
 *   呼び出すことで、GSAPの世界からReactの世界へ安全にデータを渡すことができます。
 */
export default function SlideSectionPage() {
	// --- Refs ---
	const triggerRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// --- React State ---
	// 現在アクティブなセクションを管理するState ('start', 1, 2, 3, 'end')
	const [activeSection, setActiveSection] = useState<string | number>("start");
	// セクション内のボタンでのクリック回数を管理するState
	const [clickCount, setClickCount] = useState(0);

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger);
		const sections = gsap.utils.toArray<HTMLDivElement>(".panel");

		gsap.to(sections, {
			xPercent: -100 * (sections.length - 1),
			ease: "none",
			scrollTrigger: {
				// --- 明示的に設定/変更したプロパティ ---
				trigger: triggerRef.current,
				pin: true,
				scrub: 1,
				// (コンテナの全幅 - 1画面分の幅) 만큼 스크롤할 수 있도록 설정
				// これにより、アニメーションのprogressと実際の表示が正確に同期する
				end: () =>
					`+=${(containerRef.current?.offsetWidth ?? 0) - window.innerWidth}`,

				// --- GSAPとReact Stateの連携ポイント ---
				snap: {
					snapTo: 1 / (sections.length - 1),
					duration: { min: 0.2, max: 0.5 },
					ease: "power1.inOut",
				},

				// onUpdateコールバック: スクロールするたびに実行される
				onUpdate: (self) => {
					const newSection =
						Math.round(self.progress * (sections.length - 1)) + 1;
					setActiveSection((prevSection) =>
						newSection !== prevSection ? newSection : prevSection,
					);
				},

				// onLeaveコールバック: トリガーの終点を順方向に越えたときに実行
				onLeave: () => {
					setActiveSection("end");
				},

				// onLeaveBackコールバック: トリガーの始点を逆方向に越えたときに実行
				onLeaveBack: () => {
					setActiveSection("start");
				},

				// --- 以下はデフォルト値、または挙動を理解するために重要なプロパティ ---

				// [デフォルト: "top bottom"] アニメーションの開始タイミング
				// `pin`を使う場合、通常は画面上端に固定するため、"top top"に設定するのが一般的
				start: "top top",

				// [デフォルト: true (pin:trueの時)] pinによるレイアウトのガタつきを補正
				// pinされる要素の高さ分のpaddingを自動で追加し、後続コンテンツが詰まるのを防ぐ
				pinSpacing: true,

				// [デフォルト: "play none none none"] トリガー位置を通過した際のアクション
				// onEnter, onLeave, onEnterBack, onLeaveBack の順で発火するアクションを定義
				// "play", "pause", "resume", "reverse", "restart", "reset", "complete", "none"が指定可能
				toggleActions: "play none none none",

				// [デフォルト: true] 画面リサイズ時の再計算
				// trueの場合、ブラウザのサイズが変更されるとScrollTriggerの開始/終了位置を自動で再計算する
				invalidateOnRefresh: true,

				// [デフォルト: false] 一度だけアニメーションを実行するか
				// trueにすると、最初にトリガーを通過した時のみアニメーションが実行される
				once: false,

				// [デフォルト: 0] pinの予測（高速スクロール時のガタつき防止）
				// pinが有効になる少し手前(px)から適用を開始し、高速スクロール時のピン留めのガタつきを軽減する
				// 通常は0で問題ない
				anticipatePin: 0,

				// --- デバッグ ---
				// [デフォルト: true] マーカーの表示
				// start/end/triggerの位置を視覚的に表示する。開発時に非常に役立つ
				markers: true,
			},
		});
	}, []); // []を依存配列に指定し、コンポーネントのマウント時に一度だけ実行

	return (
		<div>
			{/* --- イントロダクションセクション --- */}
			<div className="flex h-screen items-center justify-center bg-gray-800 text-3xl text-white">
				<p>下にスクロールしてください</p>
			</div>

			{/* --- 水平スライドセクションのトリガー兼ピン留めコンテナ --- */}
			<div ref={triggerRef} className="relative h-screen overflow-hidden">
				{/* --- 実際に水平移動する要素のコンテナ --- */}
				<div
					ref={containerRef}
					className="flex h-full w-[300vw]" // 3つのセクションなので300vw（3画面分）の幅
				>
					{/* --- 個別のスライドセクション --- */}
					<section className="panel flex h-full w-full items-center justify-center bg-teal-600 font-bold text-5xl text-white">
						セクション 1
					</section>

					{/* --- Stateと連動するセクション --- */}
					<section className="panel flex h-full w-full items-center justify-center bg-indigo-600 font-bold text-5xl text-white">
						<div className="text-center">
							<p>セクション 2</p>
							<p className="mt-4 text-2xl">ボタンクリック回数: {clickCount}</p>
							<button
								type="button"
								onClick={() => setClickCount((prev) => prev + 1)}
								className="mt-4 rounded-lg bg-pink-500 px-4 py-2 text-xl transition-colors hover:bg-pink-600"
							>
								カウントアップ
							</button>
						</div>
					</section>

					<section className="panel flex h-full w-full items-center justify-center bg-purple-600 font-bold text-5xl text-white">
						セクション 3
					</section>
				</div>
			</div>

			{/* --- アウトロダクションセクション --- */}
			<div className="flex h-screen items-center justify-center bg-gray-800 text-3xl text-white">
				<p>スクロール終了</p>
			</div>

			{/* --- 現在のセクションを表示するUI (Stateと連動) --- */}
			<div className="fixed right-5 bottom-5 rounded-full bg-white px-4 py-2 font-bold text-black shadow-lg">
				現在のセクション: {activeSection}
			</div>
		</div>
	);
}
