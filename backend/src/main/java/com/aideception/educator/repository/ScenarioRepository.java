package com.aideception.educator.repository;

import com.aideception.educator.entity.Scenario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScenarioRepository extends JpaRepository<Scenario, Long> {
    List<Scenario> findByType(Scenario.ScenarioType type);
    List<Scenario> findByCategory(Scenario.DeceptionCategory category);
    List<Scenario> findByDifficultyLevel(Integer difficultyLevel);
    List<Scenario> findByCreatedBy_Id(Long teacherId);
}
