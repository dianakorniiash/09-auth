import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";
import { IMG_URL, SITE_URL } from "@/lib/constants";




interface NotePageProps {
  params: Promise<{ slug: string[] }>;
}
export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params
  const category = slug[0] === "all" ? undefined : slug[0];

  return {
    title: category,
    description: `Explore the best notes in the "${category}" category on NoteHub.`,
    openGraph: {
      title: category,
      description: `Explore the best notes in the "${category}" category on NoteHub.`,
      url: `${SITE_URL}/notes/filter/${slug[0]}`,
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
export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;

  const queryClient = new QueryClient();
  const category = slug[0] === "all" ? undefined : slug[0];
  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", tag: category, page: 1 }],
    queryFn: () => fetchNotes("", 1, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} />
    </HydrationBoundary>
  );
}