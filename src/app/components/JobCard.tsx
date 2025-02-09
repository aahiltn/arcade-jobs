import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/lib/types";

export default function JobCard({ job }: { job: Job }) {
  const { keyEntities } = job;
  console.log(keyEntities);
  let formattedEntities = keyEntities;

  // Handle new format if present
  if (keyEntities?.organizations || keyEntities?.job_titles) {
    formattedEntities = {
      ...(keyEntities?.organizations?.[0] && {
        [keyEntities.organizations[0]]: "ORGANIZATION",
      }),
      ...(keyEntities?.job_titles?.[0] && {
        [keyEntities.job_titles[0]]: "TITLE",
      }),
      ...(keyEntities?.statuses?.[0] && {
        [keyEntities.statuses[0]]: "STATUS",
      }),
    };
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          {Object.entries(formattedEntities || {}).find(
            ([, value]) => value === "ORGANIZATION"
          )?.[0] || "No Company Name"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {Object.entries(formattedEntities || {}).find(
            ([, value]) => value === "TITLE"
          )?.[0] || "We must have missed the position title here."}
        </p>
        <div className="flex justify-between items-center mt-2">
          {Object.entries(formattedEntities || {}).find(
            ([, value]) => value === "STATUS"
          )?.[0] && (
            <Badge
              variant={
                Object.entries(formattedEntities || {}).find(
                  ([, value]) => value === "STATUS"
                )?.[0] === "Applied"
                  ? "default"
                  : "secondary"
              }
            >
              {
                Object.entries(formattedEntities || {}).find(
                  ([, value]) => value === "STATUS"
                )?.[0]
              }
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
