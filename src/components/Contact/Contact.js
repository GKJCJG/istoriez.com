import React, { Component } from 'react';
import { strings, slugs } from '../../utils/localization';
import styles from './Contact.module.scss'
import { withPrefix } from 'gatsby'

export default class Contact extends Component {
    render() {
        const name = `contact${process.env.GATSBY_SITE_LANG ? 'eng' : ''}`

        return (
            <form name={name} className={`md-grid ${styles.contact}`} method="POST" data-netlify="true" action={withPrefix(slugs.thankYou)}>
                <input type="hidden" name="form-name" value={name} />
                <input type="text" id="name" name="name" placeholder={strings.nameOptional} />
                <input type="email" id="email" name="email" placeholder={strings.emailOptional} />
                <textarea id="subject" name="subject" placeholder={strings.message}></textarea>
                <button type="submit">{strings.send}</button>
            </form>
        );
    }
}