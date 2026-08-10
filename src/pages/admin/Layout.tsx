<<'EOF'
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    navigate("/admin/login", { replace: true });
    return null;
  }

  return <>{children}</>;
};

export default Layout;
EOF
```

```text
github: write src/pages/admin/EventsList.tsx <<'EOF'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonPrimary } from "@/components/ui/button";
import { DeleteEvent } from "@/components/ui/delete-event";
import Layout from "./Layout";

type Event = {
  id: string;
  title: string;
  date: string;
  venue: string;
  price_general: number;
  price_vip?: number;
  image_url?: string;
};

const EventsList = () => {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]