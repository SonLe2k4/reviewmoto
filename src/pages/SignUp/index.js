
import { useEffect, useState } from 'react'
import styles from './style.module.scss';

const SignUp = () => {
    const [isSignIn, setIsSignIn] = useState(false)

    useEffect(() => {
        function Validator(formSelector) {
            const $ = document.querySelector.bind(document);
            var formRules = {};
            var _this = this;

            function getParent(element, selector) {
                while (element.parentElement) {
                    if(element.parentElement.matches(selector)) {
                        return element.parentElement
                    }
                    element = element.parentElement
                }
            }
            /**
             * Quy ước tạo rules:
             * - Nếu có lỗi, return `errorMessage`
             * - Nếu không có lỗi, return `undefined`
             */
            var validatorRules = {
                required: function (value) {
                    return value ? undefined : 'Vui lòng nhập trường này'
                },
                email: function (value) {
                    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    return regex.test(value) ? undefined : 'Vui lòng nhập Email'
                },
                min: function (min) {
                    return function (value) {
                        return value.length >= min ? undefined : `Nhập tối thiểu ${min} ký tự`
                    }
                },
                max: function (max) {
                    return function (value) {
                        return value.length <= max ? undefined : `Nhập tối đa ${max} ký tự`
                    }
                },
            };
            // get formElement from formSelector
            var formElement = $(formSelector)

            // if have formElement, handler
            if(formElement) {
                var inputs = formElement.querySelectorAll('[name][rules]')
                
                for (var input of inputs) {
                    var rules = input.getAttribute('rules').split('|');
    
                    for (var rule of rules) {
                        var ruleInfo
                        var isRuleHasValue = rule.includes(':');
    
                        if(isRuleHasValue) {
                            ruleInfo = rule.split(':')
    
                            rule = ruleInfo[0]
                        }
    
                        var ruleFunc = validatorRules[rule]
    
                        if(isRuleHasValue) {
                            ruleFunc = ruleFunc(ruleInfo[1])
                        }
    
                        if(Array.isArray(formRules[input.name])) {
                            formRules[input.name].push(ruleFunc)
                        } else {
                            formRules[input.name] = [ruleFunc]
                        }
                    }
                    //  listen events to validate (blur, change, ...)
    
                    input.onblur = handleValidate;
                    input.oninput = handleRemoveError;
                }
    
                // function handler validate
                function handleValidate (event) {
                    var rules = formRules[event.target.name]
    
                    var errorMessage
                    
                    for( var rule of rules) {
                        errorMessage = rule(event.target.value);
                        if(errorMessage) break;
                    }
                    // if have errorMessage, show it in website
                    // console.log(errorMessage);
                    if(errorMessage) {
                        var formGroup = getParent(event.target, `.${styles.form_group}`);
                        if(formGroup) {
                            formGroup.classList.add(`${styles.invalid}`);
    
                            var formMessage = formGroup.querySelector(`.${styles.form_message}`);
                            if(formMessage) {
                                formMessage.innerHTML = errorMessage;
                            }
                        }
                    }
                    return !errorMessage
                }
    
                // function remove error message
                function handleRemoveError (event) {
                    var formGroup = getParent(event.target,  `.${styles.form_group}`);
                    // console.log(formGroup)
                    if(formGroup.classList.contains(`${styles.invalid}`)) {
                        formGroup.classList.remove(`${styles.invalid}`);
    
                        var formMessage = formGroup.querySelector(`.${styles.form_message}`);
                        if(formMessage) {
                            formMessage.innerHTML = '';
                        }
                    }
                }
            }
    
            // handler submit event
            formElement.onsubmit = function (event) {
                event.preventDefault();
                
                var inputs = formElement.querySelectorAll('[name][rules]');
                var isValid = true;
                
                for(var input of inputs) {
                    // function handler validate
                    function handleValidate (event) {
                        var rules = formRules[event.target.name]
        
                        var errorMessage
                        
                        for( var rule of rules) {
                            errorMessage = rule(event.target.value);
                            if(errorMessage) break;
                        }
                        // if have errorMessage, show it in website
                        // console.log(errorMessage);
                        if(errorMessage) {
                            var formGroup = getParent(event.target, `.${styles.form_group}`);
                            if(formGroup) {
                                formGroup.classList.add(`${styles.invalid}`);
        
                                var formMessage = formGroup.querySelector(`.${styles.form_message}`);
                                if(formMessage) {
                                    formMessage.innerHTML = errorMessage;
                                }
                            }
                        }
                        return !errorMessage
                    }
                    if ( !handleValidate({ target: input })) {
                        isValid = false;
                    }
                }
    
                // when not have error, submit form
                if(isValid) {
    
                    if(typeof _this.onSubmit === 'function') {
                        var enableInputs = formElement.querySelectorAll('[name]');
                        var formValue = Array.from(enableInputs).reduce((values, input) => {
                            switch (input.type) {
                                case 'radio':
                                    values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value
                                    break;
                                case 'checkbox':
                                    if(!input.matches(':checked')) {
                                        return values
                                    }
                                    if(!Array.isArray(values[input.name])) {
                                        values[input.name] = [];    
                                    }
                                    values[input.name].push(input.value);
                                break;
                                case 'file':
                                    values[input.name] = input.files;
                                break;
                                default:
                                    values[input.name] = input.value
                            }
    
                            return values
                        }, {})
                        
                        // callback onsubmit function and return with the values of the form
                        _this.onSubmit(formValue);
                    } else {
                        formElement.submit();
                    }
                }
            }
            // console.log(formRules);
        }

        var form = new Validator(`#${styles.register_form}`)
        
        form.onSubmit = function(data) {
            console.log(data);
            alert(`
            fullName: ${data.fullName}
            
            email: ${data.email}
            
            password: ${data.password}
            `);
        }
    }, [])

    const handleSignLogIn = (e) => {
        e.preventDefault();
        setIsSignIn(prev => !prev)
    }

    return (
        <div className={styles.wp}>
            <form action="" id={styles.register_form} method="POST">
                <h3 className={styles.heading}>{isSignIn && 'Đăng ký' || 'Đăng nhập'}</h3>  
                {
                   isSignIn && 
                    <div className={styles.form_group}>
                        <label htmlFor="fullname" className={styles.form_label}>Tên đăng ký</label>
                        <input type="text" id="fullname" name="fullname" placeholder="VD: Lê Thanh Sơn" className={styles.form_control} rules="required"/>
                        <span className={styles.form_message}></span>    
                    </div> ||
                    <div className={styles.form_group}>
                        <label htmlFor="fullname" className={styles.form_label}>Tên đăng nhập</label>
                        <input type="text" id="fullname" name="fullname" placeholder="VD: Lê Thanh Sơn" className={styles.form_control} rules="required"/>
                        <span className={styles.form_message}></span>    
                    </div>
                }
                <div className={styles.form_group}>
                    <label htmlFor="email" className={styles.form_label}>Email</label>
                    <input type="text" id="email" name="email" placeholder="VD: email@domain.com" className={styles.form_control} rules="required|email"/>
                    <span className={styles.form_message}></span>    
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="password" className={styles.form_label}>Mật khẩu</label>
                    <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" className={styles.form_control} rules="required|min:6"/>
                    <span className={styles.form_message}></span>    
                </div>
                <button className={styles.form_submit}>{isSignIn && 'Đăng ký' || 'Đăng nhập'}</button>
                <span className={styles.changeSelector}>
                    {
                        isSignIn === true ? `Đã có tài khoản ?` : `Chưa có tài khoản ?` 
                    }
                    {
                        isSignIn === true ? 
                        <a href="#" onClick={(e) => handleSignLogIn(e)}>Đăng nhập</a>
                        : <a href="#" onClick={(e) => handleSignLogIn(e)}>Đăng ký</a>
                    }
                </span>
            </form>
        </div>
    )
}

export default SignUp