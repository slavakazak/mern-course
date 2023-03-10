import React, { useEffect, useState, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export function AuthPage() {
	const auth = useContext(AuthContext)
	const message = useMessage()
	const { loading, error, request, clearError } = useHttp()

	const [form, setForm] = useState({
		email: '', password: ''
	})

	useEffect(() => {
		message(error)
		clearError()
	}, [error, message, clearError])

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}

	const registerHandler = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', { ...form })
			message(data.message)
		} catch (e) {

		}
	}

	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', { ...form })
			auth.login(data.token, data.userId)
		} catch (e) {

		}
	}

	return (
		<div className='row'>
			<div className='col s8 offset-s2'>
				<h1>Сократи Ссылку</h1>
				<div className="card blue darken-1">
					<div className="card-content white-text">
						<span className="card-title" style={{ marginBottom: 30 }}>Авторизация</span>
						<div>

							<div className="input-field">
								<input
									placeholder="Введите email"
									id="email"
									type="text"
									className='yellow-input'
									name='email'
									value={form.email}
									onChange={changeHandler}
								/>
								<label htmlFor="email">Email</label>
							</div>

							<div className="input-field">
								<input
									placeholder="Введите пароль"
									id="password"
									type="password"
									className='yellow-input'
									name='password'
									value={form.password}
									onChange={changeHandler}
								/>
								<label htmlFor="password">Пароль</label>
							</div>

						</div>
					</div>
					<div className="card-action">
						<button
							className='btn yellow darken-4'
							style={{ marginRight: 10 }}
							disabled={loading}
							onClick={loginHandler}
						>
							Войти
						</button>
						<button
							className='btn grey lighten-1 black-text'
							onClick={registerHandler}
							disabled={loading}
						>
							Регистрация
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}