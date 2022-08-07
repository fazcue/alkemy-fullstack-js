import { siteName, siteUrl } from '../common/site'
import Head from 'next/head'

interface Props {
	title: string
	description: string
}

const Seo = ({title, description}: Props): JSX.Element => {
	return (
		<Head>
			<title>{`${title} - ${siteName}`}</title>
			<link rel='icon' href='/favicon.ico' />
			<link rel='canonical' href={siteUrl ? siteUrl : 'http://localhost:3000'} />
			<meta name='description' content={`${description}`} />
		</Head>
	)
}

export default Seo
