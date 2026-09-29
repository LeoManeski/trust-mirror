package com.aideception.educator.config;

import com.aideception.educator.entity.Scenario;
import com.aideception.educator.repository.ScenarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {
    @Autowired
    private ScenarioRepository scenarioRepository;
    
    @Override
    public void run(String... args) {
        scenarioRepository.deleteAll();
        seedScenarios();
    }
    
    private void seedScenarios() {
        Scenario scenario1 = new Scenario();
        scenario1.setTitle("Man Walking on Mars - Real or Fake?");
        scenario1.setDescription("Watch this video and determine if it shows a real person walking on Mars, or if it's deceptive content.");
        scenario1.setType(Scenario.ScenarioType.VIDEO);
        scenario1.setCategory(Scenario.DeceptionCategory.VISUAL_INCONSISTENCY);
        scenario1.setContent("{\"video\": \"mars-walking-video\", \"claim\": \"Real footage of a man walking on Mars\", \"source\": \"Social Media\", \"question\": \"Is this video showing a real person walking on Mars?\"}");
        scenario1.setExplanation("This video is deceptive. While it may look convincing, humans have not yet walked on Mars. The video likely uses visual effects, green screen technology, or is a deepfake. Real Mars footage comes from rovers and satellites, not human astronauts. Look for inconsistencies in lighting, gravity effects, or atmospheric conditions that don't match Mars' environment.");
        scenario1.setIsDeceptive(true);
        scenario1.setManipulationTechniques("Visual Manipulation, Deepfake Technology, False Context, Misleading Presentation");
        scenario1.setPsychologicalTriggers("Awe, Wonder, Trust in Visual Evidence, Authority Bias");
        scenario1.setDifficultyLevel(3);
        scenario1.setVideoUrl("https://streamable.com/e/z45lxk");
        scenarioRepository.save(scenario1);
        
        Scenario scenario2 = new Scenario();
        scenario2.setTitle("Urgent Account Verification");
        scenario2.setDescription("A message claiming your account will be deleted if you don't verify immediately");
        scenario2.setType(Scenario.ScenarioType.TEXT_MESSAGE);
        scenario2.setCategory(Scenario.DeceptionCategory.URGENCY_TACTICS);
        scenario2.setContent("{\"message\": \"URGENT: Your account will be permanently deleted in 24 hours if you don't verify now! Click here immediately: verify-now.com/urgent\", \"sender\": \"Security Team\"}");
        scenario2.setExplanation("This message uses urgency tactics to pressure you into acting quickly without thinking. Legitimate services never threaten immediate account deletion. The URL is suspicious and the message creates false urgency.");
        scenario2.setIsDeceptive(true);
        scenario2.setManipulationTechniques("False Urgency, Threat Creation, Suspicious Link");
        scenario2.setPsychologicalTriggers("Fear of Loss, Time Pressure, Authority Impersonation");
        scenario2.setDifficultyLevel(2);
        scenarioRepository.save(scenario2);
        
        Scenario scenario3 = new Scenario();
        scenario3.setTitle("Celebrity Product Endorsement");
        scenario3.setDescription("A social media post from a celebrity promoting a product");
        scenario3.setType(Scenario.ScenarioType.SOCIAL_MEDIA_POST);
        scenario3.setCategory(Scenario.DeceptionCategory.AUTHORITY_BIAS);
        scenario3.setContent("{\"platform\": \"Instagram\", \"post\": \"I've been using this amazing product and it changed my life! Get 50% off with code CELEB50\", \"image\": \"celebrity-photo.jpg\"}");
        scenario3.setExplanation("This post exploits authority bias by using a celebrity's image. The account may be fake, the endorsement may be AI-generated, or the celebrity may not have actually endorsed it. Always verify the official account.");
        scenario3.setIsDeceptive(true);
        scenario3.setManipulationTechniques("Authority Impersonation, Social Proof, Fake Endorsement");
        scenario3.setPsychologicalTriggers("Celebrity Influence, Trust in Authority, FOMO");
        scenario3.setDifficultyLevel(3);
        scenarioRepository.save(scenario3);
        
        Scenario scenario4 = new Scenario();
        scenario4.setTitle("Heartbreaking Story Request");
        scenario4.setDescription("A message with an emotional story asking for help");
        scenario4.setType(Scenario.ScenarioType.TEXT_MESSAGE);
        scenario4.setCategory(Scenario.DeceptionCategory.EMOTIONAL_MANIPULATION);
        scenario4.setContent("{\"message\": \"My daughter is in the hospital and I need $500 for her surgery. Please help us, we're desperate. Any amount helps. Send to: urgent-help@email.com\"}");
        scenario4.setExplanation("This message uses emotional manipulation to exploit your empathy. While the story may be compelling, legitimate charities have verification processes. Always verify before sending money.");
        scenario4.setIsDeceptive(true);
        scenario4.setManipulationTechniques("Emotional Appeal, False Emergency, Guilt Induction");
        scenario4.setPsychologicalTriggers("Empathy, Compassion, Desire to Help");
        scenario4.setDifficultyLevel(2);
        scenarioRepository.save(scenario4);
        
        Scenario scenario5 = new Scenario();
        scenario5.setTitle("Verified News Article");
        scenario5.setDescription("A news article from a verified source");
        scenario5.setType(Scenario.ScenarioType.NEWS_ARTICLE);
        scenario5.setCategory(Scenario.DeceptionCategory.SOURCE_VERIFICATION);
        scenario5.setContent("{\"title\": \"New Study Shows Benefits of Digital Literacy Education\", \"source\": \"BBC News\", \"date\": \"2024-01-15\", \"author\": \"Jane Smith\", \"url\": \"bbc.com/news/education\"}");
        scenario5.setExplanation("This is a legitimate article from a verified news source (BBC). It has proper attribution, date, author, and comes from a known reputable source. Always check the source and verify the URL.");
        scenario5.setIsDeceptive(false);
        scenario5.setManipulationTechniques("None - Legitimate Source");
        scenario5.setPsychologicalTriggers("None");
        scenario5.setDifficultyLevel(1);
        scenarioRepository.save(scenario5);
        
        Scenario scenario6 = new Scenario();
        scenario6.setTitle("Politician Making Controversial Statement");
        scenario6.setDescription("A video of a politician saying something controversial");
        scenario6.setType(Scenario.ScenarioType.VIDEO);
        scenario6.setCategory(Scenario.DeceptionCategory.VISUAL_INCONSISTENCY);
        scenario6.setContent("{\"video\": \"politician-video.mp4\", \"claim\": \"Politician admits to scandal\", \"source\": \"unknown-user-123\"}");
        scenario6.setExplanation("This video may be a deepfake. Look for visual inconsistencies like unnatural facial movements, audio sync issues, or unusual lighting. Always verify with official sources before sharing.");
        scenario6.setIsDeceptive(true);
        scenario6.setManipulationTechniques("Deepfake Technology, Visual Manipulation, False Attribution");
        scenario6.setPsychologicalTriggers("Shock Value, Confirmation Bias, Viral Sharing");
        scenario6.setDifficultyLevel(4);
        scenarioRepository.save(scenario6);
        
        Scenario scenario7 = new Scenario();
        scenario7.setTitle("Screenshot of Private Conversation");
        scenario7.setDescription("A screenshot showing a private conversation");
        scenario7.setType(Scenario.ScenarioType.SCREENSHOT);
        scenario7.setCategory(Scenario.DeceptionCategory.VISUAL_INCONSISTENCY);
        scenario7.setContent("{\"image\": \"conversation-screenshot.png\", \"claim\": \"Proof of private message\", \"context\": \"Shared on social media\"}");
        scenario7.setExplanation("Screenshots can be easily faked using editing tools. Look for inconsistencies in fonts, spacing, timestamps, or UI elements. Always verify with the original source.");
        scenario7.setIsDeceptive(true);
        scenario7.setManipulationTechniques("Image Manipulation, False Evidence, Context Removal");
        scenario7.setPsychologicalTriggers("Trust in Visual Evidence, Gossip Interest");
        scenario7.setDifficultyLevel(3);
        scenarioRepository.save(scenario7);
        
        Scenario scenario8 = new Scenario();
        scenario8.setTitle("Limited Time Offer");
        scenario8.setDescription("An email about a limited-time exclusive offer");
        scenario8.setType(Scenario.ScenarioType.EMAIL);
        scenario8.setCategory(Scenario.DeceptionCategory.SCARCITY);
        scenario8.setContent("{\"subject\": \"Only 3 hours left! 90% off - Exclusive offer\", \"body\": \"This offer expires in 3 hours. Only 5 items left in stock. Don't miss out!\", \"sender\": \"deals@unknown-store.com\"}");
        scenario8.setExplanation("This email uses scarcity tactics to create false urgency. The sender is unverified, the discount is unrealistically high, and the time pressure is artificial. Legitimate businesses don't use such aggressive tactics.");
        scenario8.setIsDeceptive(true);
        scenario8.setManipulationTechniques("False Scarcity, Time Pressure, Unrealistic Discounts");
        scenario8.setPsychologicalTriggers("FOMO, Fear of Missing Out, Greed");
        scenario8.setDifficultyLevel(2);
        scenarioRepository.save(scenario8);
        
        Scenario scenario9 = new Scenario();
        scenario9.setTitle("Viral Challenge Post");
        scenario9.setDescription("A social media post showing many people participating in a challenge");
        scenario9.setType(Scenario.ScenarioType.SOCIAL_MEDIA_POST);
        scenario9.setCategory(Scenario.DeceptionCategory.SOCIAL_PROOF);
        scenario9.setContent("{\"platform\": \"TikTok\", \"post\": \"Everyone is doing this! Join the trend! 1M+ views!\", \"engagement\": \"High\"}");
        scenario9.setExplanation("This post uses social proof to make you feel like you're missing out. The numbers may be inflated, and the challenge might be dangerous or a scam. Don't follow trends blindly.");
        scenario9.setIsDeceptive(true);
        scenario9.setManipulationTechniques("Inflated Numbers, Bandwagon Effect, Peer Pressure");
        scenario9.setPsychologicalTriggers("Desire to Fit In, FOMO, Social Validation");
        scenario9.setDifficultyLevel(2);
        scenarioRepository.save(scenario9);
    }
}
