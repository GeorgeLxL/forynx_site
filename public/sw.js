self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  event.waitUntil(
    self.registration.showNotification(data.title ?? "ForyNX", {
      body: data.body ?? "",
      icon: "/logo.png",
      badge: "/logo.png",
      data: { url: data.url ?? "/admin/inbox" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      const url = event.notification.data?.url ?? "/admin/inbox";
      for (const client of list) {
        if (client.url.includes(url) && "focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
