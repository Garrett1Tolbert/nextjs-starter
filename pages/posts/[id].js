import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';

export default function Post({ todo }) {
	return (
		<Layout>
			<Head>
				<title>{todo.name}</title>
			</Head>
			<p>{todo.name}</p>
			<p>{todo.body}</p>
			<br />
			<br />
			<Link href="/posts">All Posts</Link>
		</Layout>
	);
}

export async function getStaticPaths() {
	// Return a list of possible value for id
	try {
		const { data } = await axios.get(
			`https://jsonplaceholder.typicode.com/comments`
		);
		const paths = data.slice(0, 10).map((el) => ({
			params: { id: el.id.toString() },
		}));
		return { paths, fallback: false };
	} catch (error) {
		console.log({ getStaticProps: error });
	}
}
export async function getStaticProps({ params }) {
	// Fetch necessary data for the blog post using params.id
	try {
		const { data } = await axios.get(
			`https://jsonplaceholder.typicode.com/comments/${params.id}`
		);
		return { props: { todo: data } };
	} catch (error) {
		console.log({ getStaticProps: error });
	}
}
