package com.aideception.educator.repository;

import com.aideception.educator.entity.ScenarioAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScenarioAttemptRepository extends JpaRepository<ScenarioAttempt, Long> {
    List<ScenarioAttempt> findByUser_Id(Long userId);
    List<ScenarioAttempt> findByScenario_Id(Long scenarioId);
    List<ScenarioAttempt> findByUser_IdAndScenario_Id(Long userId, Long scenarioId);
    
    @Query("SELECT COUNT(sa) FROM ScenarioAttempt sa WHERE sa.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(sa) FROM ScenarioAttempt sa WHERE sa.user.id = :userId AND sa.isCorrect = true")
    Long countCorrectByUserId(@Param("userId") Long userId);
    
    @Query("SELECT sa FROM ScenarioAttempt sa WHERE sa.user.teacherId = :teacherId")
    List<ScenarioAttempt> findByTeacherId(@Param("teacherId") Long teacherId);
}
