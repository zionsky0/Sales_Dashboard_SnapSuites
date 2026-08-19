export function renderSalesGuide() {
  return `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Hero Header -->
      <div style="background: linear-gradient(135deg, var(--bg-card-solid), rgba(128,0,32,0.4)); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 32px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span class="badge" style="background: var(--gold-primary); color: #000; font-weight: 800; font-size: 11px; margin-bottom: 12px;">BEGINNER'S SALES MASTERCLASS</span>
          <h2 style="font-size: 28px; font-weight: 800; color: #FFF; margin-bottom: 8px;">How to Get Started & Close Photobooth Jobs Like a Pro</h2>
          <p style="font-size: 14px; color: var(--text-muted); max-width: 700px; line-height: 1.6;">
            Never done sales before? No problem! This step-by-step playbook breaks down exactly where to find high-paying clients, what to say, how to follow up, and how to turn simple conversations into secured £250–£350 bookings.
          </p>
        </div>
        <div style="font-size: 64px;">🚀</div>
      </div>

      <!-- Step 1: Lead Generation Channels -->
      <div class="playbook-card">
        <h3 style="font-size: 20px; font-weight: 700; color: var(--gold-light); display: flex; align-items: center; gap: 10px;">
          <span>📍 Step 1: Where to Find Potential Customers Today</span>
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 8px;">
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); padding: 18px; border-radius: 12px;">
            <div style="font-size: 16px; font-weight: 700; color: #FFF; margin-bottom: 6px;">1. Bark.com & AddToEvent Alerts</div>
            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
              Set up instant email alerts for <strong>Photobooth Hire in Manchester, Cheshire, Leeds, Harrogate, and Liverpool</strong>. Reply within 15 minutes using our 1-click Quote Generator — fast replies close 70% of Bark jobs!
            </p>
          </div>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); padding: 18px; border-radius: 12px;">
            <div style="font-size: 16px; font-weight: 700; color: #FFF; margin-bottom: 6px;">2. Instagram Hashtags & Venue Search</div>
            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
              Search Instagram for <code>#CheshireWedding</code>, <code>#ManchesterPartyPlanner</code>, <code>#LeedsEvents</code>. Send a friendly DM to brides-to-be or 30th birthday hosts showing photos of the SnapSuites mahogany booth!
            </p>
          </div>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); padding: 18px; border-radius: 12px;">
            <div style="font-size: 16px; font-weight: 700; color: #FFF; margin-bottom: 6px;">3. Local Venue Partnerships</div>
            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
              Reach out to wedding coordinators at country estates & luxury hotels (e.g. Peckforton Castle, Grantley Hall). Offer them exclusive £25 upgrades for their clients if they put SnapSuites on their supplier list.
            </p>
          </div>
        </div>
      </div>

      <!-- Step 2: The 4 Magic Selling Points -->
      <div class="playbook-card">
        <h3 style="font-size: 20px; font-weight: 700; color: var(--gold-light); display: flex; align-items: center; gap: 10px;">
          <span>✨ Step 2: The 4 Magic Selling Points of SnapSuites</span>
        </h3>
        <p style="font-size: 13px; color: var(--text-muted);">Whenever talking to a client, highlight these 4 features to make SnapSuites stand out from cheap competition:</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-top: 8px;">
          <div style="background: rgba(212,175,55,0.06); border: 1px solid var(--border-glass); padding: 16px; border-radius: 12px;">
            <div style="font-size: 15px; font-weight: 700; color: var(--gold-primary);">1. Statement Furniture</div>
            <div style="font-size: 12px; color: var(--text-main); margin-top: 4px;">Styled in mahogany & gold brass trim that enhances luxury decor instead of a plastic tripod.</div>
          </div>

          <div style="background: rgba(128,0,32,0.15); border: 1px solid rgba(128,0,32,0.3); padding: 16px; border-radius: 12px;">
            <div style="font-size: 15px; font-weight: 700; color: #FFA0B4;">2. Interactive Rear Screen</div>
            <div style="font-size: 12px; color: var(--text-main); margin-top: 4px;">Displays a live custom slideshow of birthday host / couple photos continuously throughout the night.</div>
          </div>

          <div style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.2); padding: 16px; border-radius: 12px;">
            <div style="font-size: 15px; font-weight: 700; color: #93C5FD;">3. 7pm–10pm Sweet Spot</div>
            <div style="font-size: 12px; color: var(--text-main); margin-top: 4px;">Give expert advice! Suggest 7pm–10pm as the sweet spot when guests settle in & celebrations peak.</div>
          </div>

          <div style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2); padding: 16px; border-radius: 12px;">
            <div style="font-size: 15px; font-weight: 700; color: #6EE7B7;">4. Instant Thermal Prints</div>
            <div style="font-size: 12px; color: var(--text-main); margin-top: 4px;">Up to 6 high-definition prints per turn + instant digital QR sharing to guest smartphones.</div>
          </div>
        </div>
      </div>

      <!-- Step 3: The 4-Phase Sales Workflow -->
      <div class="playbook-card">
        <h3 style="font-size: 20px; font-weight: 700; color: var(--gold-light); display: flex; align-items: center; gap: 10px;">
          <span>🔄 Step 3: The 4-Phase Sales Workflow (First Contact to Deposit)</span>
        </h3>

        <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 8px;">
          <div style="background: var(--bg-card-solid); border: 1px solid var(--border-light); padding: 16px; border-radius: 12px; display: flex; gap: 16px; align-items: flex-start;">
            <div style="background: var(--gold-primary); color: #000; font-weight: 800; padding: 8px 14px; border-radius: 8px; font-size: 16px;">1</div>
            <div>
              <div style="font-weight: 700; font-size: 15px; color: #FFF;">Phase 1: Send the Tailored Quote (Within 1 Hour)</div>
              <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
                Use the <strong>Quote Builder</strong> tab to create a personalized proposal. Mention their name, event date, and recommend the 7pm–10pm hire window. Copy the generated Bark/Email text and send it immediately!
              </div>
            </div>
          </div>

          <div style="background: var(--bg-card-solid); border: 1px solid var(--border-light); padding: 16px; border-radius: 12px; display: flex; gap: 16px; align-items: flex-start;">
            <div style="background: #8B5CF6; color: #FFF; font-weight: 800; padding: 8px 14px; border-radius: 8px; font-size: 16px;">2</div>
            <div>
              <div style="font-weight: 700; font-size: 15px; color: #FFF;">Phase 2: Friendly Follow-Up (Day 2)</div>
              <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
                If they haven't replied in 48 hours, send a short non-pushy message: <em>"Hi Sarah, just following up on your June 19th birthday photobooth quote! Would you like to see examples of our custom rear-screen slideshow setup?"</em>
              </div>
            </div>
          </div>

          <div style="background: var(--bg-card-solid); border: 1px solid var(--border-light); padding: 16px; border-radius: 12px; display: flex; gap: 16px; align-items: flex-start;">
            <div style="background: #F59E0B; color: #000; font-weight: 800; padding: 8px 14px; border-radius: 8px; font-size: 16px;">3</div>
            <div>
              <div style="font-weight: 700; font-size: 15px; color: #FFF;">Phase 3: Add a Sweetener to Close (Day 4)</div>
              <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
                If they are hesitant on price, offer a free add-on bonus: <em>"If you'd like to get your date secured this week, I'd be happy to throw in our Memory Guestbook & Metallic Pens (£40 value) for free!"</em>
              </div>
            </div>
          </div>

          <div style="background: var(--bg-card-solid); border: 1px solid var(--border-light); padding: 16px; border-radius: 12px; display: flex; gap: 16px; align-items: flex-start;">
            <div style="background: var(--accent-success); color: #000; font-weight: 800; padding: 8px 14px; border-radius: 8px; font-size: 16px;">4</div>
            <div>
              <div style="font-weight: 700; font-size: 15px; color: #FFF;">Phase 4: Collect £100 Deposit & Celebrate!</div>
              <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
                Send bank transfer / invoice details for the £100 date-hold deposit. Once paid, switch the lead stage in the CRM to <strong>"Deposit Paid (Won)"</strong> to earn your commission!
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 4: Daily Checklist -->
      <div class="playbook-card" style="background: linear-gradient(135deg, var(--bg-card-solid), rgba(212,175,55,0.1)); border-color: var(--border-glass);">
        <h3 style="font-size: 18px; font-weight: 700; color: var(--gold-primary);">✅ Your Daily 10-Minute Sales Routine</h3>
        <ul class="talking-points-list" style="font-size: 14px; line-height: 1.8; margin-top: 8px;">
          <li><strong style="color: #FFF;">Check Bark & Instagram Notifications</strong> (Reply to new enquiries immediately).</li>
          <li><strong style="color: #FFF;">Check CRM Pipeline for Follow-ups Due</strong> (Send Day 2 or Day 4 follow-up messages).</li>
          <li><strong style="color: #FFF;">Add 2 New Potential Venues / Planners</strong> to your <strong>Prospecting Radar</strong>.</li>
          <li><strong style="color: #FFF;">Log Contact Activity</strong> & celebrate your commission growth!</li>
        </ul>
      </div>
    </div>
  `;
}
