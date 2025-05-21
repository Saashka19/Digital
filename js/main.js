///disabled button
document.addEventListener('DOMContentLoaded', function () {
	let btn = document.getElementById('btn');
	btn.addEventListener('click', function (event) {
		event.preventDefault();
		btn.classList.add('disabled');
	});
});

////chart/////
document.addEventListener('DOMContentLoaded', function () {
	const ctx = document.getElementById('step__charts').getContext('2d');
	const tooltipEl = document.getElementById('chart__tooltip');
	const wrapper = document.querySelector('.step');

	const fullData = [
		0, 10, 5, 35, 20, 30, 20, 30, 50, 45, 60, 55, 75, 65, 85, 80, 70, 100,
	];
	const labels = fullData.map((_, i) => i + 1);

	let animatedData = [0, ...new Array(fullData.length - 1).fill(null)];
	let tooltipVisible = false;

	const index60 = fullData.indexOf(60);

	const chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [
				{
					data: animatedData,
					borderColor: '#4318FF',
					borderWidth: 4,
					tension: 0.2,
					pointRadius: function (context) {
						return context.dataIndex === index60 ? 5 : 0;
					},
					pointBackgroundColor: '#fff',
					pointBorderColor: '#4318FF',
					pointBorderWidth: 1,
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			animation: false,
			layout: { padding: { left: 20, right: 20 } },
			plugins: {
				tooltip: { enabled: false },
				legend: { display: false },
			},
			scales: {
				x: { display: false },
				y: { min: 0, max: 110, display: false },
			},
		},
	});

	let step = 1;
	function animateChart() {
		if (step < fullData.length) {
			animatedData[step] = fullData[step];
			chart.data.datasets[0].data = animatedData;
			chart.update();

			if (step === index60 && !tooltipVisible) {
				showTooltip();
			}

			step++;
			setTimeout(() => requestAnimationFrame(animateChart), 300);
		}
	}

	function showTooltip() {
		tooltipVisible = true;
		const meta = chart.getDatasetMeta(0);
		const point = meta.data[index60];
		tooltipEl.style.left = `${point.x - tooltipEl.offsetWidth / 2 + 10}px`;
		tooltipEl.style.top = `${point.y - 45}px`;
		tooltipEl.style.visibility = 'visible';
		tooltipEl.style.opacity = '1';
	}

	animateChart();
});

// program accordion

document.addEventListener('DOMContentLoaded', function () {
	const modules = document.querySelectorAll('.program__module');

	modules.forEach(module => {
		const arrow = module;
		const hashButtons = module.querySelectorAll('.program__module-hash-btn');
		const hashContents = module.querySelectorAll(
			'.program__module-hash-content'
		);
		const closeAllButton = module.querySelector('.program__close-all');

		function isMobile() {
			return window.innerWidth <= 960;
		}

		arrow.addEventListener('click', function (event) {
			if (
				!event.target.closest('.program__module-content-top') &&
				!event.target.closest('.program__module-content-bottom')
			) {
				module.classList.toggle('active');

				hashContents.forEach(content => {
					content.classList.remove('active');
					content.style.display = 'none';
				});
				hashButtons.forEach(btn => btn.classList.remove('active'));

				if (!module.classList.contains('active')) {
					closeAllButton.style.display = 'none';
				}
			}
		});

		hashButtons.forEach((btn, index) => {
			btn.addEventListener('click', function () {
				const isActive = hashContents[index].classList.contains('active');

				hashContents.forEach(content => {
					content.classList.remove('active');
					content.style.display = 'none';
				});
				hashButtons.forEach(button => button.classList.remove('active'));

				if (!isActive) {
					hashContents[index].style.display = 'block';
					setTimeout(() => {
						hashContents[index].classList.add('active');
					}, 10);
					btn.classList.add('active');

					if (isMobile()) {
						closeAllButton.style.display = 'block';
					}
				} else {
					closeAllButton.style.display = 'none';
				}
			});
		});

		closeAllButton.addEventListener('click', function () {
			hashContents.forEach(content => {
				content.classList.remove('active');
				content.style.display = 'none';
			});
			hashButtons.forEach(button => button.classList.remove('active'));
			closeAllButton.style.display = 'none';
		});

		window.addEventListener('resize', function () {
			if (!isMobile()) {
				closeAllButton.style.display = 'none';
			}
		});
	});
});

// careers block hidden

document.addEventListener('DOMContentLoaded', function () {
	const buttons = document.querySelectorAll('.careers__btn');
	const texts = document.querySelectorAll('.careers__text');
	const images = document.querySelectorAll('.careers__img');

	buttons.forEach(button => {
		button.addEventListener('click', function () {
			const target = this.getAttribute('data-target');

			texts.forEach(text => text.classList.remove('active'));
			images.forEach(img => img.classList.remove('active'));

			document
				.querySelector(`.careers__text-${target}`)
				.classList.add('active');
			document.querySelector(`.careers__img-${target}`).classList.add('active');
		});
	});
});

////problem close popup
function t_popup__closePopup(e) {
	if (!e) return;
	e.classList.remove('t-popup_show');
	setTimeout(() => {
		e.style.display = 'none';
	}, 300);
	document.body.classList.remove('t-body_popupshowed');
	document.body.removeAttribute('style');
}
document.addEventListener('click', function (event) {
	if (event.target.closest('.t-popup__block-close-button')) {
		let popup = document.querySelector('.t-popup.t-popup_show');
		t_popup__closePopup(popup);
	}
});
