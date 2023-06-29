import type { Metadata } from 'next';

async function getProduct(id: number) {
    const res = { title: 'Product ' + id };
    return res;
}

export async function generateMetadata({ params }: { params: { id: number } }): Promise<Metadata> {
    const product = await getProduct(params.id);
    return { title: product.title };
}

export default async function Page({ params }: { params: { id: number } }) {
    const product = await getProduct(params.id);
    // ...

    return <h3>{product.title}</h3>;
}
