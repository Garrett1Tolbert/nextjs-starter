import Head from 'next/head';
import styled from '@emotion/styled';
import axios from 'axios';
import Link from 'next/link';

const Item = styled.p`
	padding: 8px 12px;
	background: #eeeeee;
	cursor: pointer;
`;

export default function Posts({ todos }) {
	return todos.map((el) => (
		<Link href={`posts/${el.id}`}>
			<Item key={el.id}>{el.name}</Item>
		</Link>
	));
}

export async function getStaticProps() {
	try {
		const { data } = await axios.get(
			`https://jsonplaceholder.typicode.com/comments`
		);
		return { props: { todos: data.slice(0, 10) } };
	} catch (error) {
		console.log({ getStaticProps: error });
	}
}
