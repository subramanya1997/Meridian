import { Plus, Pencil, Trash2, Image, Megaphone, GripVertical } from "lucide-react";

import { db } from "@meridian/db";
import { homepageBanners, promoBanners, tenants } from "@meridian/db/schema";
import { eq, asc } from "drizzle-orm";

import {
  PageHeader,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  StatusBadge,
  EmptyState,
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@meridian/ui";
import { Breadcrumbs } from "../../../components/breadcrumbs";

export default async function ContentPage() {
  let banners: { id: string; title: string; subtitle: string | null; badgeText: string | null; bgColor: string | null; isActive: boolean; sortOrder: number }[] = [];
  let promos: { id: string; title: string; description: string | null; discountPct: string | null; discountLabel: string | null; bgColor: string | null; isActive: boolean; sortOrder: number }[] = [];

  try {
    const tenant = await db.query.tenants.findFirst({
      where: eq(tenants.slug, "demo"),
    });
    if (tenant) {
      banners = await db.query.homepageBanners.findMany({
        where: eq(homepageBanners.tenantId, tenant.id),
        orderBy: [asc(homepageBanners.sortOrder)],
        columns: { id: true, title: true, subtitle: true, badgeText: true, bgColor: true, isActive: true, sortOrder: true },
      });
      promos = await db.query.promoBanners.findMany({
        where: eq(promoBanners.tenantId, tenant.id),
        orderBy: [asc(promoBanners.sortOrder)],
        columns: { id: true, title: true, description: true, discountPct: true, discountLabel: true, bgColor: true, isActive: true, sortOrder: true },
      });
    }
  } catch {
    // DB not available
  }

  return (
    <>
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Content" }]} />

      <PageHeader
        title="Content Management"
        description="Manage your storefront homepage banners, promos, and content blocks."
      >
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Content
        </Button>
      </PageHeader>

      <Tabs defaultValue="banners" className="w-full">
        <TabsList>
          <TabsTrigger value="banners" className="gap-2">
            <Image className="h-4 w-4" />
            Hero Banners
          </TabsTrigger>
          <TabsTrigger value="promos" className="gap-2">
            <Megaphone className="h-4 w-4" />
            Promo Banners
          </TabsTrigger>
        </TabsList>

        <TabsContent value="banners" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Homepage Hero Banners</CardTitle>
              <CardDescription>
                Manage the hero carousel banners displayed on the storefront homepage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {banners.length === 0 ? (
                <EmptyState
                  icon={Image}
                  title="No banners yet"
                  description="Create your first homepage banner to attract customers."
                  action={
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Banner
                    </Button>
                  }
                />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8"></TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Subtitle</TableHead>
                      <TableHead>Badge</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {banners.map((banner) => (
                      <TableRow key={banner.id}>
                        <TableCell>
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                        </TableCell>
                        <TableCell className="font-medium">{banner.title}</TableCell>
                        <TableCell className="text-muted-foreground">{banner.subtitle ?? "—"}</TableCell>
                        <TableCell>
                          {banner.badgeText ? (
                            <Badge variant="secondary">{banner.badgeText}</Badge>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={banner.isActive ? "active" : "inactive"} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Promotional Banners</CardTitle>
              <CardDescription>
                Manage promotional offer banners displayed on the homepage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {promos.length === 0 ? (
                <EmptyState
                  icon={Megaphone}
                  title="No promos yet"
                  description="Create promotional banners to highlight special offers."
                  action={
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Promo
                    </Button>
                  }
                />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8"></TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {promos.map((promo) => (
                      <TableRow key={promo.id}>
                        <TableCell>
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                        </TableCell>
                        <TableCell className="font-medium">{promo.title}</TableCell>
                        <TableCell className="text-muted-foreground">{promo.description ?? "—"}</TableCell>
                        <TableCell>
                          {promo.discountPct ? (
                            <Badge variant="secondary">{promo.discountPct}</Badge>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={promo.isActive ? "active" : "inactive"} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
