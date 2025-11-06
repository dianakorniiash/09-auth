import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import { IMG_URL, SITE_URL } from "@/lib/constants";

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}
export async function generateMetadata({ params }: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params
  const data = await fetchNoteById(id)
  return {
    title: data.title,
    description: data.content,
    openGraph: {
      title: data.title,
      description: data.content,
      url: `${SITE_URL}/notes/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: IMG_URL,
          width: 1200,
          height: 630,
          alt: 'NoteHub',
        },
      ]
    }
  }
}
export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}