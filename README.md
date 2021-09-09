#### 계획
0. 그림으로 메모 그릴 수 있는 사이트 개발
1. 백엔드 구축(express)
2. OOP 적용해보기(가능한 곳에 다)
3. canvas 써보기(그림 그리기)
4. (옵션) DB에 메모 저장 가능한지 확인해보기

#### 210903 nodejs
라매개발자님의 동영상을 보고 
1. express 패키지를 사용해서 app.js 구동
2. pug로 템플릿 파일(html 변수, 수식 등이 적용 가능해짐) 적용해봄
> 내 목적은 프론트엔드가 가져야 할 백엔드 기초지식 함양인데 react가 pug의 기능을 할 수 있는 것으로 보여 과감하게 패쓰해야겠다!
3. mongoose 적용해봄
> MongoDB에서 추가 기능을 사용할 수 있게 해주는 패키지

#### 210904 flask
생각보다 로그인에 필요한 백엔드 구축에 시간이 많이 들 것 같아서 그냥 flask를 vsc에서 써보면서 적응하자로 방향을 바꿨다.
뼈대는 Luke Peters 님 동영상 참고하고 js 부분을 어떻게 oop처럼 쓸지 고민 많이 해봐야 할 듯...

#### 210905 flask
vscode에서 mongodb로 정보가 안 넘어가서 몇시간 동안 찾아보다가 안 나와서 혹시나 하는 마음에 pycharm으로 돌려보니깐 된다.... 대체 왜???😨 OOP도 패스하고 일단 회원가입, 로그인, 로그아웃 최대한 간단하게 만들고 dashboard.html에 캔버스 실험을 해봐야겠다.
1. script.js -> formData를 미리 정리한다. -> body에서 정리한 formData models.py에 전송
2. models.py -> formData를 request.get_json()으로 받는다 -> DB에 데이터 저장 -> 성공 또는 실패 script.js에 전송

#### 210909 flask
1. 암호화된 비밀번호 불러올 때 pbkdf2_sha256.verify(입력한 비밀번호, 암호화된 비밀번호) 순으로 인자를 잘 적어야 True 또는 False를 값으로 준다.
나는 반대로 넣어서 값이 안 나왔다;; 입력한 비밀번호를 다시 암호화 해서 대조하는 방법도 시도해봤지만 암호화 된 값이 달라서 적용되지 않는다.
2. 토근기능을 안 넣어도 된다고 한다! 그러면 어떤 기능을 쓰는게 좋을까?
3. 동영상에 있는 session 기능을 한 번 써봐야겠다 싶어 루크의 동영상을 보니 토큰과 같은 방식으로 작동을 하는 것이었다. https://fierycoding.tistory.com/69 여기에서 토큰와 세션의 차이점을 알 수 있었다.
권한 (예를 들어 로그인을 안한 사람이 /dashboard로 url을 입력하여 들어가면 어떡하나) 같은 문제도 들어가기전에 세션으로 먼저 검사를 하여 걸러내는 방식을 사용했다. 나중에 권한 관련한 부분은 세션 체크를 넣어주면 될 것 같다.

TypeError: Object of type ObjectId is not JSON serializable: _id를 직접설정하지 않으면 자동으로 ObjectId가 생성되는데, 이것이 JSON화 되지 못하기 때문에 생긴 현상으로 추측

start_session 생성 시 session이라는 이름의 쿠키 생성... 근데 세션과 쿠키의 차이점은 저장 장소라고 하는데 이건 왜 쿠키로 저장되는지는 잘 모르겠다...

session은 app.secret_key가 있어야 작동함 -> 터미널에 python -c "import os; print(os.urandom(16))" 으로 키 생성, 근데 아무거나 해도 작동에는 문제 없는 듯?

Decorator의 *args와 **kwargs는 얼마나 변수가 들어가는지, 어떤 형식으로 들어가는지 모를 때 넣는 값인 듯 하다. 참조 : https://code.tutsplus.com/articles/understanding-args-and-kwargs-in-python--cms-29494

jinja로 html마다 js 할당 가능! 기능 구분할 때 잘 쓰일 것

내일은 빠르게 메모 앱 기능 만들어보고 모레 업로드 한번 해봐야겠다.