import { UserLSM } from "./lsm";

const lsm = new UserLSM();

/**
 * 로그인 여부를 확인합니다.
 * 
 * @example 
 * // ...
 * <a href="/my" hidden={user.hadLogin() === false}>마이페이지</a>
 * // ...
 */
function hadLogin() {
	return lsm.get().length > 0;
}

/**
 * 로그인 정보를 불러옵니다.
 * 
 * @param {string} placeholder 로그인되어 있지 않는 경우 대체될 문자열
 * @example
 * // ...
 * <div>
 * 	<ProfileIcon/>
 * 	<p>{user.getLogin()}</p>
 * </div>
 * // ...
 */
function getLogin(placeholder='') {
	if(hadLogin() === false) {
		return placeholder;
	} else {
		return lsm.get();
	}
}

/**
 * 로그인 정보를 설정합니다.
 * 
 * @param {string} id 아이디
 * @example
 * axios('http://127.0.0.1/api/login', formData)
 * .then(response => {
 * 	const id = response.data.id;
 * 	user.setLogin(id);
 * 
 * 	console.log("로그인 성공!");
 * });
 */
function setLogin(id) {
	return lsm.set(id);
}

/**
 * 로그인 정보를 제거합니다. (로그아웃 기능과 동일)
 * 
 * @example
 * <button onClick={() => user.setLogout()}>로그아웃</button>
 */
function setLogout() {
	return lsm.clear();
}

/**
 * 컴포넌트 내에서 useUser 후크로 로그인 기능을 사용할 수 있습니다.
 */
export function useUser() {
	return { hadLogin, getLogin, setLogin, setLogout };
}