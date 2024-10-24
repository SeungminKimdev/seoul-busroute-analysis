$(document).ready(function () {
    // 역 클릭 이벤트 처리
    $(document).on('click', '.station', function () {
        const stationName = $(this).data('station-name');
        const date = $('#date').val();
        const time = $('#time').val();

        if (!date || !time) {
            alert('날짜와 시간을 먼저 선택해주세요.');
            return;
        }

        // 서버로 예측 요청 보내기
        $.ajax({
            url: '/predict', // FastAPI 엔드포인트
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                station_name: stationName,
                date: date,
                time: time
            }),
            success: function (response) {
                // 예측 결과 표시
                $('#prediction-result').html(`하차인원 예측: ${response.predicted_count} 명`);
            },
            error: function () {
                alert('예측을 가져오는 중 오류가 발생했습니다.');
            }
        });
    });

    // 예측 버튼 클릭 이벤트 처리
    $('#predict-button').on('click', function () {
        alert('지하철 역을 클릭하여 예측을 확인하세요.');
    });

    // SVG 이동 및 확대/축소 기능
    const svgElement = document.getElementById('seoul-subway');
    let isPanning = false;
    let startX, startY;
    let scale = 1;
    const svgContainer = document.getElementById('subway-map-container');

    svgContainer.addEventListener('mousedown', (e) => {
        isPanning = true;
        startX = e.clientX - svgElement.getBoundingClientRect().x;
        startY = e.clientY - svgElement.getBoundingClientRect().y;
    });

    svgContainer.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        e.preventDefault();
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        svgElement.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    });

    svgContainer.addEventListener('mouseup', () => {
        isPanning = false;
    });

    svgContainer.addEventListener('mouseleave', () => {
        isPanning = false;
    });

    svgContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const wheelDelta = e.deltaY * -0.001;
        scale += wheelDelta;
        scale = Math.min(Math.max(0.5, scale), 3);
        svgElement.style.transform = `scale(${scale})`;
    });
});
