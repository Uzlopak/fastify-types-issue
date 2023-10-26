import { Static, TSchema, Type } from "@sinclair/typebox";


function Nullable<T extends TSchema & { type: string }>(schema: T) {
  return Type.Unsafe<Static<T> | null>({ ...schema, nullable: true });
}

const eventObject = Type.Object({
  id: Type.String(),
});

const subscription = Type.Object({
  id: Type.String(),
  customer: Type.String(),
  status: Type.Union([
    Type.Literal("trialing"),
    Type.Literal("active"),
    Type.Literal("incomplete"),
    Type.Literal("incomplete_expired"),
    Type.Literal("past_due"),
    Type.Literal("canceled"),
    Type.Literal("unpaid"),
    Type.Literal("paused"),
  ]),
  trial_start: Type.Number(),
  trial_end: Type.Number(),
});
const customerSubscriptionEvent = Type.Intersect([
  eventObject,
  Type.Object({
    type: Type.Union([
      Type.Literal("customer.subscription.deleted"),
      Type.Literal("customer.subscription.paused"),
      Type.Literal("customer.subscription.resumed"),
      Type.Literal("customer.subscription.updated"),
      Type.Literal("customer.subscription.created"),
    ]),
    data: Type.Object({
      object: subscription,
    }),
  }),
]);

const invoice = Type.Object({
  id: Type.String(),
  customer: Type.String(),
  description: Type.String(),
  status: Type.Union([
    Type.Literal("draft"),
    Type.Literal("open"),
    Type.Literal("void"),
    Type.Literal("paid"),
    Type.Literal("uncollectible"),
  ]),
  paid: Type.Boolean(),
  subscription: Nullable(Type.String()),
});

const invoiceEvent = Type.Intersect([
  eventObject,
  Type.Object({
    type: Type.Union([
      Type.Literal("invoice.paid"),
      Type.Literal("invoice.payment_failed"),
      Type.Literal("invoice.updated"),
    ]),
    data: Type.Object({
      object: invoice,
    }),
  }),
]);


export const postBody = Type.Union([customerSubscriptionEvent, invoiceEvent]);

export type PostBody = Static<typeof postBody>;


