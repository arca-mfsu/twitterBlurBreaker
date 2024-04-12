

(function(){
	//초기화
	let waitPageUpdating = false;
	let nextPageUpdate = performance.now();
	//짧은 시간에 많이 실행되는것을 방지하기 위해 최대 0.1초마다 한번에 처리하도록 합니다
	let updatePageData = function(){
		if(waitPageUpdating){
			return;
		}
		const remainTime = nextPageUpdate - performance.now();
		const update = function(){
			//1번이라도 오류가 나면 작동을 더이상 안할 수 있으므로 조기에 wait 상태를 풀어줍니다.
			waitPageUpdating = false;
			nextPageUpdate = performance.now() + 50;
			
			buttons = [...document.querySelectorAll("section[role='region'] li[id^='verticalGridItem'] div[role='button']>span")];
			buttons.map((e)=>{
				e.click();
			})
			console.log(buttons.length + "개의 버튼 자동 클릭 완료")
		}
		waitPageUpdating = true;
		if(remainTime < 0){
			//대기 시간이 지난 경우
			setTimeout(update, 50);
		}else if(remainTime < 1000){
			//대기 시간이 남아 있는 경우
			setTimeout(update, parseInt(remainTime)+50);
		}else{
			//문제 발생으로 인해 대기 시간이 1초가 넘는 경우
			setTimeout(update, 1000);
		}
	}
	//페이지 구조가 조금이라도 바뀔때마다 실행됨
	let pageObserver = new MutationObserver(updatePageData)
	pageObserver.observe(document.body,{ childList: true, subtree: true });
})();

